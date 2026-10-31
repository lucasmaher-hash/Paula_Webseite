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
