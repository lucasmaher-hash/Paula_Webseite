// /1/ is generated from the experimental page. Only its services section changes.
(function () {
  'use strict';
  if (!/\/1\/?$/.test(location.pathname)) return;
  var scriptURL = document.currentScript.src;
  var section = document.querySelector('#behandlungen');
  if (!section) return;
  var booking = section.querySelector('.btn').cloneNode(true);
  var categories = {};
  section.querySelectorAll('.accordion details').forEach(function (detail) {
    categories[detail.id] = Array.from(detail.querySelectorAll('.service-list li')).map(function (item) {
      return {name:item.querySelector('.name').textContent,description:item.querySelector('.desc').textContent,category:detail.id};
    });
  });
  var groups = [
    {id:'manikuere',title:'Maniküre',lead:'Form, Farbe und Finish.',kind:'nails',categories:['manikuere']},
    {id:'wimpern',title:'Wimpern & Brauen',lead:'Schwung und Ausdruck.',kind:'eyes',categories:['wimpern','brauen']},
    {id:'gesicht',title:'Haut & Permanent Make-up',lead:'Pflege, Kontur und Farbe.',kind:'profile',view:'head',categories:['gesicht','pmu']}
  ];
  // Seitenprofil: Umriss aus einer Silhouetten-Referenz per Schwellwert und Konturverfolgung (OpenCV) gewonnen,
  // dazu Lippen aus dem Umriss abgeleitet. Brauen, Lippen und Wimpern reagieren auf die gewählte Behandlung.
  // Seitenprofil: reine Silhouette. Umriss aus einer Referenz per Schwellwert und Konturverfolgung (OpenCV) gewonnen; wird als 3D-Platte gerendert.
  var PROFILES={"head":{"d":"M254.0 81.4 L249.0 82.0 L244.0 82.0 L239.0 82.4 L234.0 83.0 L229.0 83.6 L224.0 84.1 L219.0 85.0 L214.0 86.0 L209.0 87.3 L204.0 88.4 L199.0 89.7 L194.0 91.0 L189.0 92.6 L184.0 94.4 L179.0 96.7 L174.0 99.0 L169.0 101.7 L164.0 104.3 L159.0 107.0 L154.0 109.9 L149.0 113.0 L144.0 116.0 L139.0 119.6 L134.0 123.6 L129.0 128.0 L124.0 132.3 L119.1 137.0 L114.9 142.0 L110.7 147.0 L106.4 152.0 L102.9 157.0 L99.6 162.0 L96.6 167.0 L93.6 172.0 L90.7 177.0 L87.9 182.0 L85.6 187.0 L83.1 192.0 L81.0 197.0 L79.1 202.0 L77.1 207.0 L75.3 212.0 L73.6 217.0 L72.1 222.0 L70.9 227.0 L69.6 232.0 L68.4 237.0 L67.6 242.0 L66.6 247.0 L65.4 252.0 L64.6 257.0 L64.0 262.0 L63.9 267.0 L63.1 272.0 L63.0 277.0 L63.0 282.0 L63.0 287.0 L63.0 292.0 L63.1 297.0 L63.9 302.0 L64.6 307.0 L65.1 312.0 L66.1 317.0 L67.3 322.0 L68.3 327.0 L69.4 332.0 L70.9 337.0 L72.3 342.0 L74.0 347.0 L75.9 352.0 L77.9 357.0 L80.3 362.0 L82.7 367.0 L85.4 372.0 L88.6 377.0 L92.0 382.0 L95.4 387.0 L99.3 392.0 L104.0 397.0 L109.0 402.0 L114.0 407.0 L119.0 411.3 L124.0 416.0 L128.9 421.0 L133.0 426.0 L136.7 431.0 L140.1 436.0 L142.7 441.0 L145.3 446.0 L147.3 451.0 L148.9 456.0 L150.7 461.0 L152.1 466.0 L153.6 471.0 L154.3 476.0 L155.0 481.0 L155.7 486.0 L156.0 491.0 L156.0 496.0 L156.7 501.0 L156.3 506.0 L155.7 511.0 L154.7 516.0 L153.7 521.0 L152.7 526.0 L151.6 531.0 L150.6 536.0 L150.0 541.0 L149.6 546.0 L148.3 551.0 L146.7 556.0 L145.3 561.0 L143.7 566.0 L142.1 571.0 L140.7 576.0 L138.7 581.0 L136.0 586.0 L133.1 591.0 L129.9 596.0 L126.3 601.0 L123.0 606.0 L119.7 611.0 L116.3 616.0 L112.9 621.0 L109.3 626.0 L105.9 631.0 L102.9 636.0 L99.9 641.0 L96.9 646.0 L94.3 651.0 L92.0 656.0 L90.1 661.0 L88.4 666.0 L90.1 668.9 L95.0 669.0 L100.0 669.0 L105.0 669.0 L110.0 669.0 L115.0 669.0 L120.0 669.0 L125.0 669.0 L130.0 669.0 L135.0 669.0 L140.0 669.0 L145.0 669.0 L150.0 669.0 L155.0 669.0 L160.0 669.0 L165.0 669.0 L170.0 669.0 L175.0 669.0 L180.0 669.0 L185.0 669.0 L190.0 669.0 L195.0 669.0 L200.0 669.0 L205.0 669.0 L210.0 669.0 L215.0 669.0 L220.0 669.0 L225.0 669.0 L230.0 669.0 L235.0 669.0 L240.0 669.0 L245.0 669.0 L250.0 669.0 L255.0 669.0 L260.0 669.0 L265.0 669.0 L270.0 669.0 L275.0 669.0 L280.0 669.0 L285.0 669.0 L290.0 669.0 L295.0 669.0 L300.0 669.0 L305.0 669.0 L310.0 669.0 L315.0 669.0 L320.0 669.0 L324.3 668.1 L326.1 664.0 L327.7 659.0 L329.1 654.0 L330.7 649.0 L332.3 644.0 L334.1 639.0 L336.1 634.0 L338.1 629.0 L340.1 624.0 L342.1 619.0 L344.0 614.0 L346.1 609.0 L348.0 604.0 L350.0 599.0 L352.0 594.0 L354.0 589.0 L356.0 584.0 L357.9 579.0 L359.9 574.0 L361.9 569.0 L363.9 564.0 L366.3 559.0 L368.7 554.0 L371.4 549.0 L375.0 544.0 L379.1 539.0 L384.0 534.1 L389.0 530.4 L394.0 528.3 L399.0 527.1 L404.0 527.0 L409.0 527.0 L414.0 527.6 L419.0 528.4 L424.0 529.3 L429.0 530.3 L434.0 531.3 L439.0 532.3 L444.0 533.3 L449.0 534.4 L454.0 535.3 L459.0 536.3 L464.0 537.1 L469.0 537.9 L474.0 538.6 L479.0 539.0 L484.0 539.6 L489.0 540.0 L494.0 540.0 L499.0 539.7 L504.0 538.6 L509.0 536.6 L514.0 533.1 L518.7 529.0 L522.1 524.0 L524.4 519.0 L525.7 514.0 L526.0 509.0 L525.6 504.0 L524.6 499.0 L523.0 494.0 L521.3 489.0 L520.1 484.0 L520.0 479.0 L521.6 474.0 L526.0 470.3 L531.0 468.0 L535.0 464.9 L536.0 460.0 L535.1 455.0 L533.1 450.0 L530.0 445.0 L529.0 440.1 L533.0 437.3 L537.0 434.0 L538.7 429.0 L539.0 424.0 L539.0 419.0 L538.0 414.0 L534.4 409.0 L531.3 404.0 L529.0 399.0 L528.4 394.0 L532.0 389.6 L537.0 387.1 L542.0 384.4 L547.0 380.7 L551.1 376.0 L553.4 371.0 L554.0 366.0 L553.4 361.0 L551.1 356.0 L547.6 351.0 L543.0 346.0 L538.1 341.0 L533.9 336.0 L529.0 331.0 L524.3 326.0 L520.3 321.0 L516.1 316.0 L511.9 311.0 L507.9 306.0 L504.4 301.0 L501.7 296.0 L500.4 291.0 L499.0 286.0 L496.1 281.0 L495.1 276.0 L495.0 271.0 L495.1 266.0 L496.0 261.0 L496.9 256.0 L497.0 251.0 L496.9 246.0 L495.7 241.0 L494.1 236.0 L493.0 231.0 L492.0 226.0 L490.7 221.0 L489.0 216.0 L487.3 211.0 L485.7 206.0 L484.0 201.0 L482.1 196.0 L480.3 191.0 L478.6 186.0 L476.4 181.0 L474.3 176.0 L471.7 171.0 L468.7 166.0 L465.3 161.0 L461.4 156.0 L457.0 151.0 L452.0 146.0 L447.0 141.1 L442.0 136.9 L437.0 132.7 L432.0 128.6 L427.0 124.0 L422.0 119.0 L417.0 114.1 L412.0 110.0 L407.0 106.4 L402.0 103.7 L397.0 101.4 L392.0 99.3 L387.0 96.9 L382.0 95.0 L377.0 93.3 L372.0 91.7 L367.0 90.1 L362.0 89.0 L357.0 87.9 L352.0 86.6 L347.0 85.6 L342.0 84.7 L337.0 83.9 L332.0 83.1 L327.0 82.4 L322.0 82.0 L317.0 82.0 L312.0 81.6 L307.0 81.0 L302.0 81.0 L297.0 81.0 L292.0 81.0 L287.0 81.0 L282.0 81.0 L277.0 81.0 L272.0 81.0 L267.0 81.0 L262.0 81.0 L257.0 81.0Z"}};
  document.body.classList.add('service-panels-variant');
  function node(tag,className,text) { var el=document.createElement(tag);if(className)el.className=className;if(text)el.textContent=text;return el; }
  var content = node('div','container');
  var header = node('div','section-head');
  var heading = node('div');heading.append(node('span','eyebrow','Behandlungen · Mo–Fr 10–20 Uhr'));
  var h2=node('h2','','Deine Behandlung. Deine Wahl.');h2.id='services-heading';heading.append(h2,node('p','muted','Wähle eine Leistung und entdecke ihre Form. Preise und Termine findest du bei der Buchung.'));
  header.append(heading,booking);content.append(header);
  var rows=node('div','service-sections');
  groups.forEach(function (group,index) {
    var items=group.categories.flatMap(function (id){return categories[id] || [];});
    var row=node('article','service-block '+(index===1?'theme-brown':'theme-pink'));row.id=group.id;row.dataset.kind=group.kind;
    var copy=node('div','service-copy');copy.append(node('span','eyebrow',String(index+1).padStart(2,'0')+' · '+group.title));
    var book=booking.cloneNode(true);book.classList.add('service-book','btn-sm');book.firstChild.textContent='Buchen ';book.setAttribute('aria-label','Termin buchen: '+group.title);
    var head=node('div','service-head');head.append(node('h3','service-title',group.lead),book);copy.append(head);
    var list=node('div','service-tabs');list.setAttribute('role','tablist');list.setAttribute('aria-label',group.title+' auswählen');list.setAttribute('aria-orientation','vertical');
    var description=node('div','service-description');description.id='service-description-'+index;description.setAttribute('role','tabpanel');
    var name=node('h4','service-selected-name'),paragraph=node('p','muted');description.append(name,paragraph);
    var stage=node('div','service-stage');
    var object=node('div','service-object');object.dataset.kind=group.kind;if(group.kind==='profile')object.dataset.path=PROFILES[group.view].d;object.dataset.look='basic';object.dataset.variant='default';object.setAttribute('role','img');object.setAttribute('aria-label','Abstrakte 3D-Visualisierung: '+group.title);
    stage.append(object);
    if(group.kind==='nails') stage.append(description);
    function lookFor(item) {
      var n=item.name.toLowerCase();
      if(group.kind==='profile')return 'basic';
      if(group.kind==='nails')return /french|babyboomer/.test(n)?'french':/farbe|shellack/.test(n)?'colour':/design/.test(n)&&!n.includes('ohne design')?'ornament':'basic';
      if(group.kind==='eyes')return item.category==='brauen'?'brow':/volumen/.test(n)?'volume':/verlängerung|auffüllen/.test(n)?'length':'lift';
      return item.category==='pmu'?'pigment':/aqua|glas/.test(n)?'hydrate':/micro/.test(n)?'texture':'smooth';
    }
    function select(i) {
      var item=items[i];
      Array.from(list.children).forEach(function (button,j){button.setAttribute('aria-selected',String(i===j));button.tabIndex=i===j?0:-1;});
      // Keep a category reached through the navigation visible inside its own list, without scrolling the page.
      if(list.clientHeight){
        var selectedBox=list.children[i].getBoundingClientRect(),listBox=list.getBoundingClientRect();
        if(selectedBox.top<listBox.top)list.scrollTop-=listBox.top-selectedBox.top;
        else if(selectedBox.bottom>listBox.bottom)list.scrollTop+=selectedBox.bottom-listBox.bottom;
      }
      name.textContent=item.name;paragraph.textContent=item.description;
      description.setAttribute('aria-labelledby','treatment-'+index+'-'+i);
      object.dataset.look=lookFor(item);object.dataset.variant=lookFor(item);
      object.setAttribute('aria-label','Abstrakte Visualisierung: '+item.name);
      row.dataset.selected=String(i);
    }
    var previousCategory='';
    items.forEach(function (item,i) {
      var button=node('button','service-option',item.name);button.type='button';button.id='treatment-'+index+'-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls',description.id);
      if(!group.dup && item.category!==previousCategory && item.category!==group.id) {
        var anchor=node('span','service-category-anchor');anchor.id=item.category;copy.append(anchor);
      }
      previousCategory=item.category;
      button.addEventListener('click',function(){select(i);});
      // Scrolling to a category must not select whichever row happens to pass under a stationary cursor.
      button.addEventListener('pointermove',function(event){if(event.pointerType==='mouse'&&(event.movementX||event.movementY))select(i);});
      button.addEventListener('focus',function(){select(i);});
      button.addEventListener('keydown',function(event){
        var next=i;if(event.key==='ArrowDown')next=(i+1)%items.length;else if(event.key==='ArrowUp')next=(i-1+items.length)%items.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=items.length-1;else return;
        event.preventDefault();list.children[next].focus();
      });
      list.append(button);
    });
    copy.append(list);if(group.kind!=='nails'){description.hidden=true;copy.append(description);}  // Erklärtexte unter Wimpern/Haut vorerst ausgeblendet, Anzeige folgt später
    row.append(copy,stage);rows.append(row);select(0);
    function categoryFromHash(){var id=location.hash.slice(1);if(group.categories.includes(id)){var first=items.findIndex(function(item){return item.category===id;});if(first>=0)select(first);}}
    window.addEventListener('hashchange',categoryFromHash);categoryFromHash();
    document.querySelectorAll('[data-open]').forEach(function(link){link.addEventListener('click',function(){var first=items.findIndex(function(item){return item.category===link.dataset.open;});if(first>=0)select(first);});});
  });
  content.append(rows);section.replaceChildren(content);
  var renderer=document.createElement('script');renderer.src=new URL('service-panels-3d.js?v=5',scriptURL).href;renderer.defer=true;document.body.append(renderer);
})();

// /1/ only: flowing colour background behind the frames, after tuxkarma.co (Tux Creative House).
// Their recipe: a looping gradient video as texture, rendered at half resolution, displaced by a hidden
// layer of soft "brush" sprites that are stamped at the cursor and at panel edges while scrolling;
// each sprite grows, turns and fades (opacity x0.98 per frame). The sprite value d becomes an angle
// (d*2PI) and a length, so the picture smears in curls. Here the video is replaced by a procedural,
// domain-warped noise gradient in the PM palettes, so colours stay tunable and no video is loaded.
(function () {
  'use strict';
  if (!/\/1\/?$/.test(location.pathname)) return;
  var query = new URLSearchParams(location.search);
  var local = /^(localhost|127\.0\.0\.1|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);
  var tuning = local || query.get('regler') === '1' || query.get('hintergrund') === '1';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var MAX = 48;
  // design.md colours: brown = Hintergrund/Fläche/Fläche tief/Button; pink the same row. Accent comes from the other palette.
  var PALETTES = {
    brown:{base:'#f6edea',tone1:'#eeded8',tone2:'#e7d2ca',tone3:'#d9bcb0',accent:'#e1c1c6'},
    pink:{base:'#f0e0e2',tone1:'#e8cfd3',tone2:'#e1c1c6',tone3:'#d2a9b0',accent:'#e7d2ca'}
  };
  var MOTION = {intensity:.9,accentAmount:.45,speed:1,scale:.5,warp:1,parallax:.15,
    displace:.08,trailSize:170,trailStrength:.45,trailDecay:.975,trailGrowth:1.6,scrollWaves:.6,grain:.05,resolution:.5};
  function fresh() { return {variant:query.get('bg') === 'pink' ? 'pink' : 'brown',
    colors:{brown:Object.assign({},PALETTES.brown),pink:Object.assign({},PALETTES.pink)},motion:Object.assign({},MOTION)}; }
  var key = 'pm-beauty:1:background:v1', uiKey = 'pm-beauty:1:background-ui:v1';
  var state = fresh();
  if (tuning) try {
    var saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      if (saved.variant === 'brown' || saved.variant === 'pink') state.variant = saved.variant;
      ['brown','pink'].forEach(function (v) { if (saved.colors && saved.colors[v]) Object.keys(PALETTES[v]).forEach(function (k) { if (/^#[0-9a-f]{6}$/i.test(saved.colors[v][k])) state.colors[v][k] = saved.colors[v][k]; }); });
      if (saved.motion) Object.keys(MOTION).forEach(function (k) { if (Number.isFinite(saved.motion[k])) state.motion[k] = saved.motion[k]; });
    }
    if (query.get('bg') === 'pink' || query.get('bg') === 'brown') state.variant = query.get('bg');
  } catch (e) {}

  var layer = document.createElement('div'); layer.className = 'flow-bg'; layer.setAttribute('aria-hidden','true');
  var canvas = document.createElement('canvas'), grain = document.createElement('div'); grain.className = 'flow-bg-grain';
  layer.append(canvas, grain); document.body.prepend(layer);
  var gl = canvas.getContext('webgl', {antialias:false, depth:false, stencil:false, premultipliedAlpha:false, powerPreference:'low-power'});
  function hex(h) { return [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255]; }
  function paintFallback() { var c = state.colors[state.variant]; layer.style.background = 'radial-gradient(60% 50% at 20% 30%,' + c.tone2 + ',transparent),radial-gradient(50% 60% at 80% 70%,' + c.tone1 + ',transparent),' + c.base; }
  var api = {state:state, defaults:{palettes:PALETTES, motion:MOTION}, fresh:fresh, key:key, uiKey:uiKey, tuning:tuning, apply:function () {}};
  window.pmFlowBackground = api;
  if (!gl) { layer.classList.add('is-fallback'); api.apply = function () { paintFallback(); grain.style.opacity = state.motion.grain; }; api.apply(); return; }

  var vs = 'attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
  var fs = [
    'precision highp float;varying vec2 vUv;',
    'uniform vec2 uRes;uniform float uTime,uScroll,uIntensity,uAccent,uScale,uWarp,uDisp;uniform int uCount;',
    'uniform vec3 uBase,uC1,uC2,uC3,uAcc;uniform vec4 uDrop[' + MAX + '];uniform vec2 uShape[' + MAX + '];',
    // Ashima 2D simplex noise (MIT)
    'vec3 m289(vec3 x){return x-floor(x*(1./289.))*289.;}vec2 m289(vec2 x){return x-floor(x*(1./289.))*289.;}vec3 perm(vec3 x){return m289(((x*34.)+1.)*x);}',
    'float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=m289(i);vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}',
    'float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<2;i++){s+=a*sn(p);p=p*1.9+vec2(1.7,9.2);a*=.35;}return s*1.4;}',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}',
    'void main(){vec2 px=vec2(vUv.x,1.-vUv.y)*uRes;float d=0.;',
    'for(int i=0;i<' + MAX + ';i++){if(i>=uCount)break;vec4 o=uDrop[i];vec2 s=uShape[i];vec2 q=px-o.xy;float c=cos(s.y),n=sin(s.y);q=vec2(c*q.x-n*q.y,n*q.x+c*q.y)/vec2(o.z,s.x);float r=length(q);',
    'if(r<1.){float a=atan(q.y,q.x);float brush=smoothstep(1.,.15,r)*(.7+.3*sin(a*3.+r*5.));d+=o.w*brush;}}',
    'd=min(d,1.6);float th=d*6.2831853;vec2 uv=px/uRes.y+vec2(sin(th),cos(th))*d*uDisp;uv.y+=uScroll;',
    'vec2 p=uv*uScale;float t=uTime;vec2 w=vec2(fbm(p+vec2(0.,t*.05)),fbm(p+vec2(5.2,1.3)-t*.04));vec2 q=p+uWarp*w;',
    'float f1=fbm(q+vec2(t*.03,0.)),f2=fbm(q*1.3+vec2(-t*.02,3.1)),f3=fbm(q*.7+vec2(8.,t*.025)),f4=fbm(q*.9+vec2(2.,-t*.03));',
    'vec3 col=uBase;col=mix(col,uC1,clamp(smoothstep(-.45,.6,f1)*uIntensity,0.,1.));col=mix(col,uC2,clamp(smoothstep(-.2,.75,f2)*uIntensity,0.,1.));',
    'col=mix(col,uC3,clamp(smoothstep(.05,.9,f3)*uIntensity*.85,0.,1.));col=mix(col,uAcc,clamp(smoothstep(.15,.95,f4)*uAccent,0.,1.));',
    'col+=(hash(px+fract(t))-.5)/255.;gl_FragColor=vec4(col,1.);}'
  ].join('\n');
  function shader(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  var prog;
  try { prog = gl.createProgram(); gl.attachShader(prog, shader(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog)); }
  catch (e) { console.warn('flow background', e); layer.classList.add('is-fallback'); api.apply = function () { paintFallback(); }; api.apply(); return; }
  gl.useProgram(prog);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['uRes','uTime','uScroll','uIntensity','uAccent','uScale','uWarp','uDisp','uCount','uBase','uC1','uC2','uC3','uAcc','uDrop','uShape'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

  // Brush sprites (Tux: mouse sprite opacity .55, scale .7 growing towards ~1.7, opacity x.98, slow spin).
  var drops = [], dropData = new Float32Array(MAX * 4), shapeData = new Float32Array(MAX * 2), next = 0;
  function stamp(x, y, rx, ry, alpha) {
    var d = drops[next] || (drops[next] = {});
    d.x = x; d.y = y; d.rx = rx; d.ry = ry; d.a = alpha; d.rot = Math.random() * Math.PI * 2; d.s = .7;
    next = (next + 1) % MAX;
  }
  var mouse = {x:null, y:null};
  window.addEventListener('pointermove', function (e) {
    if (reduce.matches) return;
    if (mouse.x === null || Math.abs(e.clientX - mouse.x) >= 4 || Math.abs(e.clientY - mouse.y) >= 4) {
      var m = state.motion; stamp(e.clientX, e.clientY, m.trailSize, m.trailSize, m.trailStrength);
      mouse.x = e.clientX; mouse.y = e.clientY;
    }
  }, {passive:true});
  // Scroll waves: panels drag a soft wave along their leading edge, like Tux's blocks.
  var panels = [], lastY = scrollY;
  function collectPanels() { panels = Array.from(document.querySelectorAll('.preview-frame-host')).filter(function (el) { return el.getBoundingClientRect().width > 220; }); }
  setTimeout(collectPanels, 600); window.addEventListener('resize', collectPanels);
  window.addEventListener('scroll', function () {
    var dy = scrollY - lastY; if (Math.abs(dy) < 4 || reduce.matches || state.motion.scrollWaves <= 0) return; lastY = scrollY;
    var vh = innerHeight;
    panels.forEach(function (el) {
      var b = el.getBoundingClientRect(), y = dy > 0 ? b.bottom : b.top;
      if (y < -40 || y > vh + 40 || b.width === 0) return;
      stamp(b.left + b.width / 2, y, b.width * .55, 90, .22 * state.motion.scrollWaves);
      drops[(next + MAX - 1) % MAX].rot = 0;
    });
  }, {passive:true});

  var w = 0, h = 0;
  function resize() {
    var r = Math.max(.05, state.motion.resolution);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.max(1, Math.round(w * r)); canvas.height = Math.max(1, Math.round(h * r));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  api.apply = function () {
    var c = state.colors[state.variant], m = state.motion;
    gl.uniform3fv(U.uBase, hex(c.base)); gl.uniform3fv(U.uC1, hex(c.tone1)); gl.uniform3fv(U.uC2, hex(c.tone2)); gl.uniform3fv(U.uC3, hex(c.tone3)); gl.uniform3fv(U.uAcc, hex(c.accent));
    gl.uniform1f(U.uIntensity, m.intensity); gl.uniform1f(U.uAccent, m.accentAmount); gl.uniform1f(U.uScale, m.scale); gl.uniform1f(U.uWarp, m.warp); gl.uniform1f(U.uDisp, m.displace);
    grain.style.opacity = m.grain; document.body.style.backgroundColor = c.base;
    resize(); if (!running) draw(now);
  };
  var now = 0, last = performance.now(), running = false;
  function draw(t) {
    var m = state.motion, live = 0, decay = Math.min(.9999, Math.max(0, m.trailDecay)), grow = m.trailGrowth;
    for (var i = 0; i < MAX; i++) {
      var d = drops[i];
      if (!d || d.a < .002) continue;
      dropData[live*4] = d.x; dropData[live*4+1] = d.y; dropData[live*4+2] = d.rx * d.s; dropData[live*4+3] = d.a;
      shapeData[live*2] = d.ry * d.s; shapeData[live*2+1] = d.rot; live++;
    }
    gl.uniform2f(U.uRes, w, h); gl.uniform1f(U.uTime, t); gl.uniform1f(U.uScroll, scrollY / Math.max(1, h) * m.parallax);
    gl.uniform1i(U.uCount, live); if (live) { gl.uniform4fv(U.uDrop, dropData); gl.uniform2fv(U.uShape, shapeData); }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    return {decay:decay, grow:grow};
  }
  function frame(ts) {
    if (!running) return;
    var dt = Math.min(.05, (ts - last) / 1000); last = ts;
    now += dt * state.motion.speed;
    var k = draw(now), f = dt * 60;
    drops.forEach(function (d) { if (!d || d.a < .002) return; d.a *= Math.pow(k.decay, f); d.s += (k.grow - d.s) * (1 - Math.pow(.982, f)); d.rot += dt / 2; });
    requestAnimationFrame(frame);
  }
  function setRunning() {
    var go = !document.hidden && !reduce.matches;
    if (go && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
    if (!go) { running = false; draw(now); }
  }
  document.addEventListener('visibilitychange', setRunning); reduce.addEventListener('change', setRunning);
  api.apply(); setRunning();
})();

// Dial for the flow background: localhost, ?regler=1 or ?hintergrund=1. Bottom right, draggable, collapsible.
(function () {
  'use strict';
  var bg = window.pmFlowBackground;
  if (!bg || !bg.tuning) return;
  var state = bg.state;
  var ui = {x:null, y:null, collapsed:innerWidth < 600};
  try { var su = JSON.parse(localStorage.getItem(bg.uiKey)); if (su) { if (Number.isFinite(su.x) && Number.isFinite(su.y)) { ui.x = su.x; ui.y = su.y; } ui.collapsed = su.collapsed === true; } } catch (e) {}
  var COLORS = [['base','Grund'],['tone1','Ton hell'],['tone2','Ton mittel'],['tone3','Ton tief'],['accent','Akzent (andere Palette)']];
  var SLIDERS = [
    ['Farbe', [['intensity','Farbstärke',0,3,.01,'×'],['accentAmount','Akzentmenge',0,2,.01,'×']]],
    ['Fluss', [['speed','Tempo',0,6,.05,'×'],['scale','Formgröße (klein = groß)',.05,6,.01,'×'],['warp','Verwirbelung',0,6,.05,''],['parallax','Scroll-Mitlauf',-2,2,.01,'']]],
    ['Maus und Scroll', [['displace','Verzerrung',0,1,.005,''],['trailSize','Spurgröße',10,1200,5,'px'],['trailStrength','Spurstärke',0,2,.01,''],['trailDecay','Nachleuchten',.8,.999,.001,''],['trailGrowth','Wachstum',.2,5,.05,'×'],['scrollWaves','Scroll-Wellen',0,3,.01,'×']]],
    ['Oberfläche', [['grain','Körnung',0,.6,.005,''],['resolution','Auflösung (klein = weicher)',.05,2,.01,'×']]]
  ];
  var panel = document.createElement('aside'); panel.id = 'bg-tuner'; panel.setAttribute('aria-label','Hintergrund einstellen');
  var html = '<div class="bg-tuner-header"><strong>Hintergrund</strong><button type="button" id="bg-tuner-collapse" aria-controls="bg-tuner-body" aria-expanded="true">Einklappen</button></div><div class="bg-tuner-body" id="bg-tuner-body">';
  html += '<div class="bg-tuner-seg" role="group" aria-label="Variante"><button type="button" data-variant="brown">Braun</button><button type="button" data-variant="pink">Pink</button></div>';
  html += '<fieldset><legend>Farben <span id="bg-variant-name"></span></legend>' + COLORS.map(function (c) { return '<label for="bg-c-' + c[0] + '">' + c[1] + '</label><div class="bg-tuner-row"><input type="color" id="bg-c-' + c[0] + '" data-color="' + c[0] + '"><output id="bg-c-' + c[0] + '-v"></output></div>'; }).join('') + '</fieldset>';
  SLIDERS.forEach(function (g) {
    html += '<fieldset><legend>' + g[0] + '</legend>' + g[1].map(function (s) {
      return '<label for="bg-s-' + s[0] + '">' + s[1] + '</label><div class="bg-tuner-row"><input type="range" id="bg-s-' + s[0] + '" data-key="' + s[0] + '" min="' + s[2] + '" max="' + s[3] + '" step="' + s[4] + '"><input type="number" aria-label="' + s[1] + '" data-num="' + s[0] + '" step="' + s[4] + '"><span>' + s[5] + '</span></div>';
    }).join('') + '</fieldset>';
  });
  html += '<pre id="bg-settings" tabindex="0" aria-label="Aktuelle Hintergrundwerte"></pre><div class="bg-tuner-actions"><button type="button" id="bg-copy">Kopieren</button><button type="button" id="bg-reset">Zurücksetzen</button></div></div>';
  panel.innerHTML = html; document.body.append(panel);
  var body = panel.querySelector('#bg-tuner-body'), collapse = panel.querySelector('#bg-tuner-collapse'), out = panel.querySelector('#bg-settings');
  var limits = {}; SLIDERS.forEach(function (g) { g[1].forEach(function (s) { limits[s[0]] = {min:s[2], max:s[3]}; }); });
  function saveState() { try { localStorage.setItem(bg.key, JSON.stringify(state)); } catch (e) {} }
  function saveUi() { try { localStorage.setItem(bg.uiKey, JSON.stringify(ui)); } catch (e) {} }
  function exported() { return JSON.stringify({variant:state.variant, colors:state.colors[state.variant], motion:state.motion}, null, 2); }
  function sync() {
    panel.querySelectorAll('[data-variant]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.variant === state.variant)); });
    panel.querySelector('#bg-variant-name').textContent = state.variant === 'pink' ? '(Pink)' : '(Braun)';
    COLORS.forEach(function (c) { var v = state.colors[state.variant][c[0]]; panel.querySelector('#bg-c-' + c[0]).value = v; panel.querySelector('#bg-c-' + c[0] + '-v').textContent = v; });
    Object.keys(limits).forEach(function (k) {
      var v = state.motion[k], r = panel.querySelector('#bg-s-' + k), n = panel.querySelector('[data-num="' + k + '"]');
      r.min = Math.min(limits[k].min, v); r.max = Math.max(limits[k].max, v); r.value = v;
      if (document.activeElement !== n) n.value = v;
    });
    out.textContent = exported();
  }
  function changed() { bg.apply(); saveState(); sync(); }
  panel.querySelectorAll('[data-variant]').forEach(function (b) { b.addEventListener('click', function () { state.variant = b.dataset.variant; changed(); }); });
  panel.querySelectorAll('[data-color]').forEach(function (i) { i.addEventListener('input', function () { state.colors[state.variant][i.dataset.color] = i.value; changed(); }); });
  panel.querySelectorAll('[data-key],[data-num]').forEach(function (i) {
    i.addEventListener('input', function () {
      if (i.value === '') return; var v = Number(i.value), k = i.dataset.key || i.dataset.num;
      if (!Number.isFinite(v)) return;
      if (k === 'resolution' && v <= 0) return; if (k === 'trailSize' && v <= 0) return;
      state.motion[k] = v; changed();
    });
  });
  panel.querySelector('#bg-reset').addEventListener('click', function () { var f = bg.fresh(); f.variant = state.variant; state.colors = f.colors; state.motion = f.motion; changed(); });
  var copy = panel.querySelector('#bg-copy');
  copy.addEventListener('click', function () { if (navigator.clipboard) navigator.clipboard.writeText(exported()).then(function () { copy.textContent = 'Kopiert'; setTimeout(function () { copy.textContent = 'Kopieren'; }, 1200); }); });
  function clamp() {
    var b = panel.getBoundingClientRect();
    ui.x = Math.max(8, Math.min(ui.x === null ? b.left : ui.x, innerWidth - b.width - 8));
    ui.y = Math.max(8, Math.min(ui.y === null ? b.top : ui.y, innerHeight - Math.min(b.height, 56) - 8));
    panel.style.left = ui.x + 'px'; panel.style.top = ui.y + 'px'; panel.style.right = panel.style.bottom = 'auto';
  }
  function setCollapsed() {
    body.hidden = ui.collapsed; collapse.setAttribute('aria-expanded', String(!ui.collapsed)); collapse.textContent = ui.collapsed ? 'Ausklappen' : 'Einklappen';
    if (ui.x !== null) { var b = panel.getBoundingClientRect(); if (ui.y + b.height > innerHeight - 8) ui.y = innerHeight - b.height - 8; clamp(); }
    saveUi();
  }
  collapse.addEventListener('click', function () { if (ui.x === null) { var b = panel.getBoundingClientRect(); ui.x = b.left; ui.y = b.top; } ui.collapsed = !ui.collapsed; setCollapsed(); });
  var drag = null;
  panel.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || e.target.closest('input,button,label,pre,output')) return;
    var b = panel.getBoundingClientRect(); drag = {id:e.pointerId, x:e.clientX - b.left, y:e.clientY - b.top};
    panel.setPointerCapture(e.pointerId); panel.classList.add('is-dragging'); e.preventDefault();
  });
  panel.addEventListener('pointermove', function (e) { if (!drag || e.pointerId !== drag.id) return; ui.x = e.clientX - drag.x; ui.y = e.clientY - drag.y; clamp(); });
  function end() { if (!drag) return; drag = null; panel.classList.remove('is-dragging'); saveUi(); }
  panel.addEventListener('pointerup', end); panel.addEventListener('pointercancel', end);
  window.addEventListener('resize', function () { if (ui.x !== null) { clamp(); saveUi(); } });
  if (ui.x !== null) clamp();
  setCollapsed(); sync();
})();
