/* Source for the renderer embedded in manicure-panels.html.
   Bundle with Three.js 0.184.0 and esbuild; the HTML makes no external requests. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const stage = document.querySelector('.panels');
const detail = document.querySelector('.detail');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
} catch (error) {
  document.documentElement.dataset.renderer = 'css-fallback';
}
if (renderer) {
  renderer.domElement.className = 'nail-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  stage.prepend(renderer.domElement);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .92;
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 3000);
  camera.position.z = 1200;
  const studio = new RoomEnvironment();
  // Long studio softboxes create clear edge reflections in the lacquer.
  for (const [x, y, z, w, h, brightness] of [[-3, 1, 4, .7, 7, 7], [4, 0, 3, 1.3, 5, 4], [0, 4, 2, 5, 1, 5], [-.65, 0, 4, .24, 6, 4], [.65, 0, 4, .18, 5, 3]]) {
    const light = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(brightness, brightness, brightness), side: THREE.DoubleSide }));
    light.position.set(x, y, z); light.lookAt(0, 0, 0); studio.add(light);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, .04);
  scene.environment = environment.texture;
  studio.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff3ef, 0x9b6b7d, .45));
  const key = new THREE.DirectionalLight(0xfff8f2, 1.35);
  key.position.set(-260, 380, 600); scene.add(key);
  const fill = new THREE.DirectionalLight(0xe9e5ff, .4);
  fill.position.set(300, -100, 350); scene.add(fill);

  function silhouette(w, h) {
    const x = w / 2, y = h / 2, r = 26;
    const bottom = Math.min(66, w * .24);
    const shape = new THREE.Shape();
    shape.moveTo(-x + r, y);
    shape.lineTo(x - r, y); shape.quadraticCurveTo(x, y, x, y - r);
    shape.lineTo(x, -y + bottom);
    shape.bezierCurveTo(x, -y + bottom * .3, x * .54, -y, 0, -y);
    shape.bezierCurveTo(-x * .54, -y, -x, -y + bottom * .3, -x, -y + bottom);
    shape.lineTo(-x, y - r); shape.quadraticCurveTo(-x, y, -x + r, y);
    return shape;
  }
  function geometry(w, h) {
    const bevel = Math.min(11, w * .035);
    let g = new THREE.ExtrudeGeometry(silhouette(w - bevel * 2 - 4, h - bevel * 2 - 4), {
      depth: 5, bevelEnabled: true, bevelThickness: 10, bevelSize: bevel,
      bevelSegments: 12, steps: 1, curveSegments: 32
    });
    // Smooth the bevel while retaining a broad, planar front face.
    g = mergeVertices(g); g.computeVertexNormals();
    const positions = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < positions.count; i++) uv.setXY(i, (positions.getX(i) + w / 2) / w, (positions.getY(i) + h / 2) / h);
    return g;
  }
  // A tiny change in surface normal gives the polish a broad studio reflection.
  // The geometry and the text-bearing face remain planar.
  const normals = new Uint8Array(128 * 256 * 4);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 128; x++) {
    const i = (y * 128 + x) * 4;
    const nx = Math.sin(x / 127 * Math.PI * 2 - .5) * .075;
    const ny = Math.sin(y / 255 * Math.PI * 2) * .018;
    normals[i] = Math.round((nx + 1) * 127.5); normals[i + 1] = Math.round((ny + 1) * 127.5);
    normals[i + 2] = 255; normals[i + 3] = 255;
  }
  const normalTexture = new THREE.DataTexture(normals, 128, 256); normalTexture.needsUpdate = true;
  normalTexture.magFilter = THREE.LinearFilter; normalTexture.minFilter = THREE.LinearFilter;
  function lacquer(map, colour = '#e5c8d0') {
    return new THREE.MeshPhysicalMaterial({ color: colour, map, normalMap: normalTexture, clearcoatNormalMap: normalTexture, metalness: .16, roughness: .2,
      clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: .55 });
  }
  const textureCanvas = document.createElement('canvas'); textureCanvas.width = 512; textureCanvas.height = 1024;
  const ctx = textureCanvas.getContext('2d');
  const previousCanvas = document.createElement('canvas'); previousCanvas.width = 512; previousCanvas.height = 1024;
  const previousCtx = previousCanvas.getContext('2d');
  let hasPrevious = false;
  const texture = new THREE.CanvasTexture(textureCanvas); texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const left = new THREE.Mesh(new THREE.BufferGeometry(), lacquer(null, '#cb9eaf'));
  const nail = new THREE.Mesh(new THREE.BufferGeometry(), lacquer(texture, '#ffffff'));
  scene.add(left, nail);
  const gems = new THREE.Group(); nail.add(gems);
  const gemMaterial = new THREE.MeshPhysicalMaterial({ color: '#d5c9dd', metalness: .55, roughness: .08,
    clearcoat: 1, clearcoatRoughness: .02, transmission: .12, thickness: 3, ior: 2.3, envMapIntensity: .85 });
  function jewelGeometry() {
    const rings = [[3.2, 7], [6.8, 3], [7.1, 1], [0, -4]], points = [];
    const at = (r, z, i) => [Math.cos(i * Math.PI / 4) * r, Math.sin(i * Math.PI / 4) * r, z];
    for (let i = 0; i < 8; i++) {
      points.push(0, 0, 7, ...at(3.2, 7, i), ...at(3.2, 7, i + 1));
      for (let k = 0; k < rings.length - 1; k++) {
        const [r, z] = rings[k], [nr, nz] = rings[k + 1];
        points.push(...at(r, z, i), ...at(nr, nz, i), ...at(nr, nz, i + 1));
        points.push(...at(r, z, i), ...at(nr, nz, i + 1), ...at(r, z, i + 1));
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3)); g.computeVertexNormals(); return g;
  }
  const gemGeometry = jewelGeometry();
  const gemLocations = [
    [.10, .07, 1], [.17, .11, .7], [.09, .15, .65], [.18, .18, .45], [.10, .22, .35],
    [.88, .89, 1], [.80, .86, .75], [.90, .81, .6], [.81, .78, .4],
    [.94, .39, .6], [.92, .44, .4], [.94, .49, .3]
  ];
  for (const [x, y, scale] of gemLocations) {
    const gem = new THREE.Mesh(gemGeometry, gemMaterial); gem.scale.set(scale, scale * 1.25, scale);
    gem.rotation.set(.07, -.12, x * 15); gem.userData.placement = [x, y]; gems.add(gem);
  }

  let stageWidth = 0, stageHeight = 0, look = detail.dataset.look, lookStart = performance.now(), dirty = true;
  let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0, lastDraw = 0;
  const palette = ['#123e42', '#441e37', '#6b3025', '#213652'];
  const a = new THREE.Color(), b = new THREE.Color();
  function drawTexture(seconds) {
    const w = 512, h = 1024;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#b88e98'; ctx.fillRect(0, 0, w, h);
    if (look === 'colour') {
      const cycle = reducedMotion.matches ? 0 : seconds / 4;
      const index = Math.floor(cycle) % palette.length, fraction = cycle % 1;
      const mix = THREE.MathUtils.smoothstep(fraction, .8, 1);
      a.set(palette[index]); b.set(palette[(index + 1) % palette.length]); a.lerp(b, mix);
      ctx.fillStyle = '#' + a.getHexString(); ctx.fillRect(0, 0, w, h);
    }
    if (look === 'french') {
      ctx.fillStyle = '#fff9f3'; ctx.beginPath(); ctx.moveTo(0, h * .75);
      ctx.quadraticCurveTo(w / 2, h * .95, w, h * .75); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
    }
    if (look === 'glow') {
      const base = ctx.createLinearGradient(0, 0, w, 0); base.addColorStop(0, '#a76a85'); base.addColorStop(.45, '#d7a9c1'); base.addColorStop(1, '#ad7799');
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      const y = h * (.5 + (reducedMotion.matches ? 0 : Math.sin(seconds * Math.PI / 2) * .32));
      ctx.save(); ctx.translate(w / 2, y); ctx.scale(1, .36);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * .8);
      glow.addColorStop(0, '#fff3ff'); glow.addColorStop(.28, '#f8dcf4cc'); glow.addColorStop(.65, '#f0c9f066'); glow.addColorStop(1, '#f0c9f000');
      ctx.fillStyle = glow; ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore();
    }
    // Very soft polish reflection, in addition to the actual environment reflections.
    const sheen = ctx.createLinearGradient(0, 0, w, h * .18);
    sheen.addColorStop(0, '#ffffff00'); sheen.addColorStop(.13, '#ffffff00'); sheen.addColorStop(.21, '#ffffff28'); sheen.addColorStop(.34, '#ffffff08'); sheen.addColorStop(.6, '#ffffff00');
    ctx.fillStyle = sheen; ctx.fillRect(0, 0, w, h);
    // Reflections of two long manicure-studio light strips in the clear coat.
    for (const [x, y, width, strength] of [[.20, .43, .055, .52], [.79, .37, .018, .38]]) {
      ctx.save(); ctx.translate(w * x, h * y); ctx.rotate(-.055); ctx.scale(width, .85);
      const reflection = ctx.createRadialGradient(0, 0, 0, 0, 0, h * .35);
      reflection.addColorStop(0, `rgba(255,255,255,${strength})`);
      reflection.addColorStop(.42, `rgba(255,255,255,${strength * .65})`);
      reflection.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = reflection; ctx.fillRect(-h, -h, h * 2, h * 2); ctx.restore();
    }
    if (hasPrevious && !reducedMotion.matches && seconds < .45) {
      ctx.globalAlpha = 1 - THREE.MathUtils.smoothstep(seconds, 0, .45);
      ctx.drawImage(previousCanvas, 0, 0); ctx.globalAlpha = 1;
    }
    texture.needsUpdate = true;
  }
  function resize() {
    const box = stage.getBoundingClientRect(); stageWidth = box.width; stageHeight = box.height;
    renderer.setSize(stageWidth, stageHeight, false);
    camera.left = -stageWidth / 2; camera.right = stageWidth / 2; camera.top = stageHeight / 2; camera.bottom = -stageHeight / 2; camera.updateProjectionMatrix();
    for (const [element, mesh] of [[document.querySelector('.list'), left], [detail, nail]]) {
      const r = element.getBoundingClientRect(); mesh.geometry.dispose(); mesh.geometry = geometry(r.width, r.height);
      mesh.position.set(r.x - box.x + r.width / 2 - stageWidth / 2, stageHeight / 2 - (r.y - box.y + r.height / 2), 0);
      if (mesh === nail) for (const gem of gems.children) {
        const [x, y] = gem.userData.placement; gem.position.set((x - .5) * r.width, (.5 - y) * r.height, 21);
      }
    }
    dirty = true;
  }
  const observer = new MutationObserver(() => {
    previousCtx.clearRect(0, 0, 512, 1024); previousCtx.drawImage(textureCanvas, 0, 0); hasPrevious = true;
    look = detail.dataset.look; lookStart = performance.now(); dirty = true;
  });
  observer.observe(detail, { attributes: true, attributeFilter: ['data-look'] });
  new ResizeObserver(resize).observe(stage);
  stage.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches) return;
    const r = stage.getBoundingClientRect(); pointerX = (event.clientX - r.x) / r.width - .5; pointerY = .5 - (event.clientY - r.y) / r.height;
  });
  stage.addEventListener('pointerleave', () => { pointerX = pointerY = 0; });
  reducedMotion.addEventListener('change', () => { pointerX = pointerY = smoothX = smoothY = 0; dirty = true; });
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault(); document.documentElement.classList.remove('has-3d'); document.documentElement.dataset.renderer = 'css-fallback';
  });
  function frame(time) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const movingLight = Math.abs(smoothX - pointerX) + Math.abs(smoothY - pointerY) > .001;
    const movingLook = !reducedMotion.matches && (look === 'glow' || look === 'colour');
    const fading = !reducedMotion.matches && time - lookStart < 450;
    if (!dirty && !movingLight && !movingLook && !fading) return;
    if (time - lastDraw < 1000 / 30) return;
    smoothX += (pointerX - smoothX) * .12; smoothY += (pointerY - smoothY) * .12;
    key.position.set(-260 + smoothX * 260, 380 + smoothY * 160, 600);
    if (dirty || movingLook || fading) drawTexture((time - lookStart) / 1000);
    gems.visible = look === 'ornament';
    renderer.render(scene, camera); dirty = false; lastDraw = time;
  }
  resize(); drawTexture(0); gems.visible = look === 'ornament'; renderer.render(scene, camera);
  document.documentElement.classList.add('has-3d'); document.documentElement.dataset.renderer = 'three-webgl';
  requestAnimationFrame(frame);
}
