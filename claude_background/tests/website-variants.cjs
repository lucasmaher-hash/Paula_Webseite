// Requires /tmp/pm-frame-check/node_modules/playwright and a preview server on port 8080.
const {chromium}=require(process.env.PM_PLAYWRIGHT || '/tmp/pm-frame-check/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.PM_BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--enable-unsafe-swiftshader']});
 try {
  for(const width of[375,1440]) {
   const context=await browser.newContext({viewport:{width,height:950}}),p=await context.newPage(),errors=[],missing=[];
   p.on('pageerror',e=>errors.push(e.message));
   p.on('response',r=>{if(r.url().startsWith('http://localhost:8080/')&&r.status()>=400)missing.push(r.url());});
   await p.goto('http://localhost:8080/index-experimentell.html',{waitUntil:'networkidle'});
   assert.equal(await p.locator('#frame-tuner').count(),0,'tuner hidden even on localhost');
   const defaults=await p.evaluate(()=>{const c=getComputedStyle(document.documentElement);return ['brown-width','brown-start','brown-end','pink-width','pink-start','pink-end'].map(x=>c.getPropertyValue('--preview-frame-'+x).trim());});
   assert.deepEqual(defaults,['1.4px','#dac6be','#e5d8d2','1.4px','#d0b3b8','#d9bfc1']);
   assert.equal(await p.locator('.strip img[src*=aquafacial]').count(),1);
   const originalNames=await p.locator('.service-list .name').allTextContents();assert.equal(originalNames.length,38);
   const gallery=await p.locator('.strip img').evaluateAll(imgs=>imgs.map(i=>i.src));assert.equal(new Set(gallery).size,8);
   const images=await p.evaluate(()=>[...document.querySelectorAll('.strip figure,.contact-figure,.about-figure,.about-figure img,.course-media,.course-media img')].map(e=>({class:e.className,border:getComputedStyle(e).borderTopWidth,animated:e.classList.contains('preview-frame-host')})));
   for(const image of images){assert.equal(image.border,'0px',JSON.stringify(image));assert.equal(image.animated,false);}
   for(const selector of['.hero-media img','.about-figure img']){await p.locator(selector).scrollIntoViewIfNeeded();await p.locator(selector).evaluate(i=>i.decode());assert.equal(await p.locator(selector).evaluate(i=>i.naturalWidth),1536);}
   if(width<900){assert((await p.locator('.hero-media img').evaluate(e=>getComputedStyle(e).maskImage)).includes('gradient'));assert(parseFloat(await p.locator('.hero-media').evaluate(e=>getComputedStyle(e).paddingTop))>0);}
   await p.addStyleTag({content:'html{scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important}.voucher{transition:none!important}'});
   await p.locator('#gutscheine').scrollIntoViewIfNeeded();await p.evaluate(()=>document.querySelector('.vouchers-grid').classList.add('spread'));await p.waitForTimeout(50);
   const cards=await p.locator('.voucher').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().toJSON()));
   if(width>=900){assert(cards[1].top<cards[0].top-30,'center card staggered up');assert(cards[1].width>cards[0].width*1.2,'center card enlarged');}
   else{assert(cards[1].x>cards[0].x+20,'mobile left/right stagger');assert(cards[2].x===cards[0].x);}
   const hint=await p.locator('.voucher-hint').boundingBox();assert(hint.y-Math.max(...cards.map(c=>c.bottom))>=16);
   async function outsideSnapshot(){return p.evaluate(()=>[...document.querySelector('main').children].filter(e=>e.id!=='behandlungen').map(e=>({text:e.textContent.replace(/\s+/g,' ').trim(),images:[...e.querySelectorAll('img')].map(i=>i.src)})));}
   const outside=await outsideSnapshot();
   await p.goto('http://localhost:8080/1/',{waitUntil:'networkidle'});
   await p.waitForFunction(()=>[...document.querySelectorAll('.service-object')].length===3&&[...document.querySelectorAll('.service-object')].every(e=>e.dataset.renderer==='three-webgl'));
   assert.deepEqual((await p.locator('.service-option').allTextContents()).sort(),originalNames.sort());
   assert.deepEqual(await outsideSnapshot(),outside,'outside the services section the two variants have identical content');
   const rows=await p.locator('.service-block').evaluateAll(es=>es.map(e=>({copy:e.querySelector('.service-copy').getBoundingClientRect().toJSON(),stage:e.querySelector('.service-stage').getBoundingClientRect().toJSON()})));
   if(width>=900){assert(rows[0].copy.x<rows[0].stage.x);assert(rows[1].stage.x<rows[1].copy.x);assert(rows[2].copy.x<rows[2].stage.x);}
   else for(const row of rows)assert(row.copy.y<row.stage.y,'mobile text before visual');
   for(const [name,kind,look]of[['Shellack mit French (inkl. russischer Maniküre)','nails','french'],['Farbe','nails','colour'],['Einfaches Design','nails','ornament'],['Korean Browlift','eyes','brow'],['Wimpernverlängerung „2–5D Volumen" — Neuanlage','eyes','volume'],['Aquafacial','skin','hydrate'],['Microneedling','skin','texture'],['Lippenpigmentierung — Erstbehandlung','skin','pigment']]){
    await p.getByRole('tab',{name,exact:true}).click();assert.equal(await p.locator('.service-object[data-kind='+kind+']').getAttribute('data-look'),look);
   }
   await p.locator('.service-block').first().locator('[role=tab]').first().focus();await p.keyboard.press('ArrowDown');assert.equal(await p.locator('.service-block').first().getAttribute('data-selected'),'1');
   await p.evaluate(()=>{location.hash='pmu';});await p.waitForTimeout(100);assert((await p.locator('.service-block#gesicht .service-selected-name').textContent()).startsWith('Microblading'));
   assert(await p.locator('.service-block#gesicht').evaluate(e=>{const a=e.querySelector('[aria-selected=true]').getBoundingClientRect(),b=e.querySelector('.service-tabs').getBoundingClientRect();return a.top>=b.top-1&&a.bottom<=b.bottom+1;}),'hash-selected service visible inside list');
   await p.emulateMedia({reducedMotion:'reduce'});
   assert.equal(await p.locator('.service-copy').first().evaluate(e=>getComputedStyle(e,'::before').animationName),'none');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
   await context.close();console.log(width+'px PASS: saved defaults, no tuner/photo borders, restored vouchers, new portraits/gallery, exact shared content, all 38 services, real 3D, alternation, selections, keyboard/hash, reduced motion, no overflow/errors/404');
  }
  const offline=await browser.newPage();await offline.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=function(type,...args){if(type.startsWith('webgl'))return null;return null;};});
  await offline.goto('http://localhost:8080/1/',{waitUntil:'networkidle'});assert.equal(await offline.locator('.service-object[data-renderer=css-fallback]').count(),3);assert.equal(await offline.locator('.service-option').count(),38);await offline.close();
  console.log('PASS: service content remains usable without WebGL');
 } finally {await browser.close();}
})();
