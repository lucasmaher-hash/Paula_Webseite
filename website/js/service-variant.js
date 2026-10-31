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
    {id:'gesicht',title:'Haut & Permanent Make-up',lead:'Pflege, Kontur und Farbe.',kind:'profile',view:'face',categories:['gesicht','pmu']},
    {id:'gesicht-kopf',title:'Haut & Permanent Make-up',lead:'Pflege, Kontur und Farbe.',kind:'profile',view:'head',dup:true,categories:['gesicht','pmu']}
  ];
  // Abstraktes Seitenprofil (Gesicht von rechts). Brauen, Lippen und Wimpern reagieren auf die gewählte Behandlung.
  var PROFILE='M290 100C320 140 332 180 334 208C336 218 334 226 332 232C346 262 364 288 372 304C376 312 370 318 360 320C354 322 350 326 350 330C354 336 360 340 362 344C360 347 356 349 352 350C358 352 362 358 360 364C356 368 350 372 348 378C354 388 356 400 348 412C340 424 320 430 304 434C296 450 294 480 292 560L130 560C134 500 142 460 134 420C84 380 64 300 70 220C74 120 140 40 214 40C250 40 274 66 290 100Z';
  function profileSVG(view,uid){
    var box=view==='face'?'175 110 235 330':'40 20 380 540';
    return '<svg viewBox="'+box+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'+
      '<defs><linearGradient id="pf-skin-'+uid+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbf1ee"/><stop offset="1" stop-color="#ecd3cf"/></linearGradient>'+
      '<radialGradient id="pf-glow-'+uid+'" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>'+
      '<path class="pf-body" d="'+PROFILE+'" fill="url(#pf-skin-'+uid+')" stroke="#d9b8b4" stroke-width="1.5"/>'+
      (view==='head'?'<path class="pf-ear" d="M196 300C176 292 172 330 188 350C196 360 206 352 204 340" fill="none" stroke="#dcc0bc" stroke-width="2" stroke-linecap="round"/>':'')+
      '<ellipse class="pf-glow" cx="300" cy="330" rx="70" ry="64" fill="url(#pf-glow-'+uid+')"/>'+
      '<g class="pf-dots" fill="#b88b88">'+[[290,300],[304,312],[286,326],[312,334],[298,346],[322,352],[280,348],[316,300]].map(function(d){return '<circle cx="'+d[0]+'" cy="'+d[1]+'" r="1.8"/>';}).join('')+'</g>'+
      '<path class="pf-brow" d="M308 207C316 202 326 201 336 205" fill="none" stroke-linecap="round"/>'+
      '<path class="pf-lid" d="M311 238C318 243 326 243 333 238" fill="none" stroke="#c9a5a2" stroke-width="2" stroke-linecap="round"/>'+
      '<g class="pf-lashes" fill="none" stroke-linecap="round">'+[[348,219],[355,230],[356,242],[351,254]].map(function(t,i){return '<path d="M'+(331+i*.8)+' '+(237+i*.6)+'L'+t[0]+' '+t[1]+'" stroke-width="1.8"/>';}).join('')+'</g>'+
      '<path class="pf-lip pf-lip-up" d="M350 330C354 336 360 340 362 344C360 347 356 349 352 350Z"/>'+
      '<path class="pf-lip pf-lip-low" d="M352 350C358 352 362 358 360 364C356 368 352 370 349 367Z"/>'+
    '</svg>';
  }
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
    var object=node('div',group.kind==='profile'?'service-profile':'service-object');object.dataset.kind=group.kind;if(group.kind==='profile')object.innerHTML=profileSVG(group.view,index);object.dataset.look='basic';object.dataset.variant='default';object.setAttribute('role','img');object.setAttribute('aria-label','Abstrakte 3D-Visualisierung: '+group.title);
    stage.append(object);
    if(group.kind==='nails') stage.append(description);
    function lookFor(item) {
      var n=item.name.toLowerCase();
      if(group.kind==='profile')return /microblading|powderbrows/.test(n)?'brows':/lippen/.test(n)?'lips':/nachbehandlung|auffrischung/.test(n)?'full':/remover/.test(n)?'none':/microneedling/.test(n)?'texture':'glow';
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
  var renderer=document.createElement('script');renderer.src=new URL('service-panels-3d.js?v=1',scriptURL).href;renderer.defer=true;document.body.append(renderer);
})();
