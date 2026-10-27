/* Three.js visual studies for /1/. The original nail source is bundled without changing its standalone HTML. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mountNail } from 'pm:original-nail';

for (const host of document.querySelectorAll('.service-object')) {
  if (host.dataset.kind === 'nails') { mountNail(host); continue; }
  mountAbstract(host);
}

function mountAbstract(host) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
  catch (error) { host.dataset.renderer='css-fallback'; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  renderer.setClearColor(0,0);
  renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-2.5,2.5,2.5,-2.5,.1,100);
  camera.position.set(0,0,8);
  const pmrem=new THREE.PMREMGenerator(renderer), room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.08);scene.environment=env.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xfff7ee,0x956874,1.5));
  const light=new THREE.DirectionalLight(0xfff4eb,3.0);light.position.set(-3,4,5);scene.add(light);
  const fill=new THREE.DirectionalLight(0xf3d6dd,1);fill.position.set(3,-2,4);scene.add(fill);
  const group=new THREE.Group();scene.add(group);
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let visible=true,dirty=true,last=0,variant=host.dataset.variant,started=performance.now();
  let pointerX=0,pointerY=0,smoothX=0,smoothY=0;
  const ink=new THREE.MeshPhysicalMaterial({color:'#745449',roughness:.32,metalness:.12,clearcoat:.7,clearcoatRoughness:.2});
  let lid,lashes,brow,surface,droplet,dots;
  if (host.dataset.kind==='eyes') {
    // A single closed arc with fine raised filaments: deliberately no literal eyeball.
    const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.65,-.2,0),new THREE.Vector3(-.85,.24,.10),new THREE.Vector3(0,.38,.14),new THREE.Vector3(.85,.24,.10),new THREE.Vector3(1.65,-.2,0)]);
    lid=new THREE.Mesh(new THREE.TubeGeometry(curve,64,.055,12,false),ink);group.add(lid);
    lashes=new THREE.Group();group.add(lashes);
    for(let i=0;i<11;i++) {
      const x=-1.40+i*.28,y=.38-.58*Math.pow(x/1.65,2);
      const c=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(x*.035,.26,.10),new THREE.Vector3(x*.11,.56,.17),new THREE.Vector3(x*.16,.69,.14)]);
      const lash=new THREE.Mesh(new THREE.TubeGeometry(c,18,.017,6,false),ink);
      lash.position.set(x,y,.04);lash.userData.index=i;lashes.add(lash);
    }
    const browCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.6,-.1,0),new THREE.Vector3(-.65,.22,.1),new THREE.Vector3(.45,.31,.1),new THREE.Vector3(1.55,-.03,0)]);
    brow=new THREE.Mesh(new THREE.TubeGeometry(browCurve,56,.14,16,false),ink);brow.scale.y=.56;brow.visible=false;group.add(brow);
    group.rotation.x=-.10;
  } else {
    // One softly domed oval surface; changes in material express care and pigmentation.
    const material=new THREE.MeshPhysicalMaterial({color:'#c99b9d',roughness:.4,metalness:.03,clearcoat:.65,clearcoatRoughness:.2,iridescence:.08,envMapIntensity:.65});
    surface=new THREE.Mesh(new THREE.SphereGeometry(1,72,48),material);surface.scale.set(1.35,1.72,.33);group.add(surface);
    droplet=new THREE.Mesh(new THREE.SphereGeometry(.13,28,20),new THREE.MeshPhysicalMaterial({color:'#fff8f4',roughness:.03,metalness:0,transmission:.7,thickness:.35,clearcoat:1}));
    droplet.scale.set(.8,1.25,.8);droplet.position.set(.5,.5,.4);group.add(droplet);
    const points=[];
    for(let y=-8;y<=8;y++)for(let x=-6;x<=6;x++) {
      const px=x*.17,py=y*.17,t=1-(px/1.35)**2-(py/1.72)**2;
      if(t>.12)points.push(px,py,.33*Math.sqrt(t)+.008);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    dots=new THREE.Points(geometry,new THREE.PointsMaterial({color:'#81585e',size:.018,transparent:true,opacity:.3}));dots.visible=false;group.add(dots);
    group.rotation.set(-.12,-.2,-.09);
  }
  function resize() {
    const box=host.getBoundingClientRect();if(!box.width||!box.height)return;
    renderer.setSize(box.width,box.height,false);
    const aspect=box.width/box.height;camera.left=-2.5*aspect;camera.right=2.5*aspect;camera.top=2.5;camera.bottom=-2.5;camera.updateProjectionMatrix();dirty=true;
  }
  new ResizeObserver(resize).observe(host);
  new MutationObserver(()=>{variant=host.dataset.variant;dirty=true;}).observe(host,{attributes:true,attributeFilter:['data-variant']});
  if('IntersectionObserver'in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)dirty=true;}).observe(host);
  host.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||reduced.matches)return;const r=host.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;});
  host.addEventListener('pointerleave',()=>{pointerX=pointerY=0;});
  reduced.addEventListener('change',()=>{pointerX=pointerY=0;dirty=true;});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();host.dataset.renderer='css-fallback';visible=false;renderer.domElement.hidden=true;});
  const targetColor=new THREE.Color();
  function frame(now) {
    requestAnimationFrame(frame);
    if(!visible||document.hidden||host.dataset.renderer==='css-fallback')return;
    if(reduced.matches&&!dirty)return;
    if(now-last<1000/30&&!dirty)return;
    const t=reduced.matches?0:(now-started)/1000;
    smoothX+=(pointerX-smoothX)*.08;smoothY+=(pointerY-smoothY)*.08;
    light.position.x=-3+Math.sin(t*.3)*.35+smoothX;
    if(lashes) {
      const isBrow=variant==='brow';lashes.visible=lid.visible=!isBrow;brow.visible=isBrow;
      const length=variant==='length'?1.18:variant==='volume'?1.10:.9;
      lashes.children.forEach((lash,i)=>{lash.scale.y+=(length-lash.scale.y)*.08;lash.rotation.x=.12+Math.sin(t*.55+i*.12)*.025;});
      brow.scale.y+=(.56+Math.sin(t*.4)*.015-brow.scale.y)*.08;
      targetColor.set(isBrow?'#8b6256':variant==='volume'?'#503b35':'#745449');ink.color.lerp(targetColor,reduced.matches?1:.07);
      group.rotation.y=Math.sin(t*.32)*.025+smoothX*.12;group.position.y=Math.sin(t*.5)*.025;
    } else {
      targetColor.set(variant==='pigment'?'#b77f84':variant==='hydrate'?'#dec2bc':variant==='texture'?'#c79898':'#d9b8ae');
      surface.material.color.lerp(targetColor,reduced.matches?1:.055);
      surface.material.roughness+=( (variant==='hydrate'?.16:variant==='smooth'?.25:.43)-surface.material.roughness)*.05;
      droplet.visible=variant==='hydrate';dots.visible=variant==='texture';
      droplet.position.set(.45+Math.sin(t*.45)*.12,.62-Math.sin(t*.35)*.18,.43);
      group.rotation.y=-.2+Math.sin(t*.3)*.025+smoothX*.10;
      group.rotation.x=-.12+smoothY*.07;group.position.y=Math.sin(t*.45)*.025;
    }
    renderer.render(scene,camera);dirty=false;last=now;
  }
  host.dataset.renderer='three-webgl';resize();frame(performance.now());
}
