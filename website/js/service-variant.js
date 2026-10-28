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
    {id:'gesicht',title:'Haut & Permanent Make-up',lead:'Pflege, Kontur und Farbe.',kind:'skin',categories:['gesicht','pmu']}
  ];
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
    copy.append(node('h3','service-title',group.lead));
    var list=node('div','service-tabs');list.setAttribute('role','tablist');list.setAttribute('aria-label',group.title+' auswählen');list.setAttribute('aria-orientation','vertical');
    var description=node('div','service-description');description.id='service-description-'+index;description.setAttribute('role','tabpanel');
    var name=node('h4','service-selected-name'),paragraph=node('p','muted');description.append(name,paragraph);
    var stage=node('div','service-stage');
    var object=node('div','service-object');object.dataset.kind=group.kind;object.dataset.look='basic';object.dataset.variant='default';object.setAttribute('role','img');object.setAttribute('aria-label','Abstrakte 3D-Visualisierung: '+group.title);
    stage.append(object);
    if(group.kind==='nails') stage.append(description);
    function lookFor(item) {
      var n=item.name.toLowerCase();
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
      object.setAttribute('aria-label','Abstrakte 3D-Visualisierung: '+item.name);
      row.dataset.selected=String(i);
    }
    var previousCategory='';
    items.forEach(function (item,i) {
      var button=node('button','service-option',item.name);button.type='button';button.id='treatment-'+index+'-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls',description.id);
      if(item.category!==previousCategory && item.category!==group.id) {
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
    var book=booking.cloneNode(true);book.classList.add('service-book');book.firstChild.textContent='Termin buchen ';
    copy.append(list);if(group.kind!=='nails')copy.append(description);copy.append(book);row.append(copy,stage);rows.append(row);select(0);
    function categoryFromHash(){var id=location.hash.slice(1);if(group.categories.includes(id)){var first=items.findIndex(function(item){return item.category===id;});if(first>=0)select(first);}}
    window.addEventListener('hashchange',categoryFromHash);categoryFromHash();
    document.querySelectorAll('[data-open]').forEach(function(link){link.addEventListener('click',function(){var first=items.findIndex(function(item){return item.category===link.dataset.open;});if(first>=0)select(first);});});
  });
  content.append(rows);section.replaceChildren(content);
  var renderer=document.createElement('script');renderer.src=new URL('service-panels-3d.js?v=1',scriptURL).href;renderer.defer=true;document.body.append(renderer);
})();
