/* Source for the renderer embedded in manicure-panels.html.
   Bundle with Three.js 0.184.0 and esbuild; the HTML makes no external requests. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const detail = document.querySelector('.detail');
const stage = detail;
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
  const baseCanvas = document.createElement('canvas'); baseCanvas.width = 512; baseCanvas.height = 1024;
  const baseCtx = baseCanvas.getContext('2d');
  let hasPrevious = false;
  const texture = new THREE.CanvasTexture(textureCanvas); texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const nail = new THREE.Mesh(new THREE.BufferGeometry(), lacquer(texture, '#ffffff'));
  scene.add(nail);
  const gems = new THREE.Group(); nail.add(gems);
  const gemMaterial = new THREE.MeshPhysicalMaterial({ color: '#bec4cc', metalness: 1, roughness: .13,
    clearcoat: 1, clearcoatRoughness: .035, envMapIntensity: 1.5 });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: '#7f8996', metalness: 1, roughness: .19 });
  const gemGeometry = new THREE.SphereGeometry(7, 32, 20);
  const rimGeometry = new THREE.TorusGeometry(7, .65, 10, 40);
  const gemLocations = [
    [.10, .07, 1], [.17, .11, .7], [.09, .15, .65], [.18, .18, .45], [.10, .22, .35],
    [.88, .89, 1], [.80, .86, .75], [.90, .81, .6], [.81, .78, .4],
    [.94, .39, .6], [.92, .44, .4], [.94, .49, .3]
  ];
  for (const [x, y, scale] of gemLocations) {
    const gem = new THREE.Group();
    const dome = new THREE.Mesh(gemGeometry, gemMaterial); dome.scale.z = .5; dome.position.z = 1.8;
    const rim = new THREE.Mesh(rimGeometry, rimMaterial); rim.position.z = .6;
    gem.add(rim, dome); gem.scale.setScalar(scale);
    gem.userData.placement = [x, y]; gem.userData.size = scale; gems.add(gem);
  }

  const shineStart = performance.now();
  let stageWidth = 0, stageHeight = 0, look = detail.dataset.look, lookStart = performance.now(), dirty = true;
  let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0, lastDraw = 0;
  const palette = ['#123e42', '#441e37', '#6b3025', '#213652'];
  const a = new THREE.Color(), b = new THREE.Color();
  function basicLength(seconds) {
    if (look !== 'basic' || reducedMotion.matches) return 1;
    const phase = (seconds % 4) / 4;
    return .78 + .22 * THREE.MathUtils.smoothstep(phase, .10, .70) * (1 - THREE.MathUtils.smoothstep(phase, .85, 1));
  }
  function drawTexture(seconds, shineSeconds = 0) {
    const w = 512, h = 1024;
    ctx.clearRect(0, 0, w, h);
    const nude = ctx.createLinearGradient(0, 0, w, 0);
    nude.addColorStop(0, '#926674'); nude.addColorStop(.18, '#b18a97');
    nude.addColorStop(.5, '#bf9aa2'); nude.addColorStop(.82, '#af8592'); nude.addColorStop(1, '#895e6d');
    ctx.fillStyle = nude; ctx.fillRect(0, 0, w, h);
    if (look === 'colour') {
      const cycle = reducedMotion.matches ? 0 : seconds / 4;
      const index = Math.floor(cycle) % palette.length, fraction = cycle % 1;
      const mix = THREE.MathUtils.smoothstep(fraction, .8, 1);
      a.set(palette[index]); b.set(palette[(index + 1) % palette.length]); a.lerp(b, mix);
      ctx.fillStyle = '#' + a.getHexString(); ctx.fillRect(0, 0, w, h);
    }
    if (look === 'french') {
      const phase = (seconds % 4) / 4;
      ctx.globalAlpha = reducedMotion.matches ? 1 : THREE.MathUtils.smoothstep(phase, .08, .5) * (1 - THREE.MathUtils.smoothstep(phase, .82, 1));
      ctx.fillStyle = '#fff9f3'; ctx.beginPath(); ctx.moveTo(0, h * .75);
      ctx.quadraticCurveTo(w / 2, h * .95, w, h * .75); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    }
    if (look === 'glow') {
      const base = ctx.createLinearGradient(0, 0, w, 0); base.addColorStop(0, '#350308'); base.addColorStop(.45, '#680714'); base.addColorStop(1, '#340107');
      ctx.fillStyle = base; ctx.fillRect(0, 0, w, h);
      const y = h * (.5 + (reducedMotion.matches ? 0 : Math.sin(shineSeconds * Math.PI / 2) * .32));
      ctx.save(); ctx.translate(w / 2, y); ctx.scale(1, .62);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * .44);
      glow.addColorStop(0, '#ffe0d973'); glow.addColorStop(.28, '#f19aac62'); glow.addColorStop(.65, '#ce3c652d'); glow.addColorStop(1, '#96082c00');
      ctx.fillStyle = glow; ctx.fillRect(-w, -h, w * 2, h * 2); ctx.restore();
    }
    if (hasPrevious && !reducedMotion.matches && seconds < .45) {
      ctx.globalAlpha = 1 - THREE.MathUtils.smoothstep(seconds, 0, .45);
      ctx.drawImage(previousCanvas, 0, 0); ctx.globalAlpha = 1;
    }
    baseCtx.clearRect(0, 0, w, h); baseCtx.drawImage(textureCanvas, 0, 0);
    // A shared clock continues through every look change. Compensate for Basic's
    // changing length so reflections remain at the same on-screen height.
    const driftX = Math.sin(shineSeconds * Math.PI / 5) * .09;
    const driftY = Math.sin(shineSeconds * Math.PI / 6) * .035;
    const reflectionTilt = -.055 + Math.sin(shineSeconds * Math.PI / 5) * .035;
    ctx.save(); ctx.scale(1, 1 / basicLength(seconds)); ctx.translate(w * driftX, h * driftY);
    // Very soft polish reflection, in addition to the actual environment reflections.
    const sheen = ctx.createLinearGradient(0, 0, w, h * .18);
    sheen.addColorStop(0, '#ffffff00'); sheen.addColorStop(.13, '#ffffff00'); sheen.addColorStop(.21, '#ffffff28'); sheen.addColorStop(.34, '#ffffff08'); sheen.addColorStop(.6, '#ffffff00');
    ctx.fillStyle = sheen; ctx.fillRect(0, 0, w, h);
    // Reflections of two long manicure-studio light strips in the clear coat.
    for (const [x, y, width, strength] of [[.25, .43, .038, .50], [.76, .37, .012, .32]]) {
      ctx.save(); ctx.translate(w * x, h * y); ctx.rotate(reflectionTilt); ctx.scale(width, .85);
      const reflection = ctx.createRadialGradient(0, 0, 0, 0, 0, h * .35);
      reflection.addColorStop(0, `rgba(255,255,255,${strength})`);
      reflection.addColorStop(.42, `rgba(255,255,255,${strength * .65})`);
      reflection.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = reflection; ctx.fillRect(-h, -h, h * 2, h * 2); ctx.restore();
    }
    ctx.save(); ctx.translate(w * .25, h * .43); ctx.rotate(reflectionTilt);
    ctx.beginPath(); ctx.ellipse(0, 0, w * .024, h * .18, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,250,246,.42)'; ctx.lineWidth = 1.8; ctx.stroke(); ctx.restore();
    ctx.restore();
    texture.needsUpdate = true;
  }
  function resize() {
    const box = stage.getBoundingClientRect(); stageWidth = box.width; stageHeight = box.height;
    renderer.setSize(stageWidth, stageHeight, false);
    camera.left = -stageWidth / 2; camera.right = stageWidth / 2; camera.top = stageHeight / 2; camera.bottom = -stageHeight / 2; camera.updateProjectionMatrix();
    const r = detail.getBoundingClientRect(); nail.geometry.dispose(); nail.geometry = geometry(r.width, r.height);
    nail.position.set(0, 0, 0);
    for (const gem of gems.children) {
      const [x, y] = gem.userData.placement; gem.position.set((x - .5) * r.width, (.5 - y) * r.height, 21);
    }
    dirty = true;
  }
  function animateNail(seconds) {
    const phase = (seconds % 4) / 4;
    const length = basicLength(seconds);
    // Anchor the upper edge. Only the bottom extends; the HTML text never scales.
    nail.scale.y = length; nail.position.y = (1 - length) * (stageHeight / 2 - 2);
    gems.visible = look === 'ornament';
    gems.children.forEach((gem, index) => {
      const appear = reducedMotion.matches ? 1 : THREE.MathUtils.smoothstep(seconds % 4, .15 + index * .16, .37 + index * .16);
      const disappear = reducedMotion.matches ? 0 : THREE.MathUtils.smoothstep(phase, .87, 1);
      const scale = appear * (1 - disappear);
      gem.visible = scale > .001;
      gem.scale.setScalar(gem.userData.size * Math.max(.001, scale));
    });
  }
  const observer = new MutationObserver(() => {
    previousCtx.clearRect(0, 0, 512, 1024); previousCtx.drawImage(baseCanvas, 0, 0); hasPrevious = true;
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
    const movingLook = !reducedMotion.matches;
    const fading = !reducedMotion.matches && time - lookStart < 450;
    if (!dirty && !movingLight && !movingLook && !fading) return;
    if (time - lastDraw < 1000 / 30) return;
    smoothX += (pointerX - smoothX) * .12; smoothY += (pointerY - smoothY) * .12;
    const shineSeconds = reducedMotion.matches ? 0 : (time - shineStart) / 1000;
    key.position.set(-260 + smoothX * 260 + Math.sin(shineSeconds * Math.PI / 5) * 60,
      380 + smoothY * 160 + Math.sin(shineSeconds * Math.PI / 6) * 35, 600);
    if (dirty || fading || movingLook) drawTexture((time - lookStart) / 1000, shineSeconds);
    animateNail((time - lookStart) / 1000);
    renderer.render(scene, camera); dirty = false; lastDraw = time;
  }
  resize(); drawTexture(0); animateNail(0); renderer.render(scene, camera);
  document.documentElement.classList.add('has-3d'); document.documentElement.dataset.renderer = 'three-webgl';
  requestAnimationFrame(frame);
}
