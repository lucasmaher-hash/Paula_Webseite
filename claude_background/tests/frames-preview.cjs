const { chromium } = require(process.env.PM_PLAYWRIGHT || '/tmp/pm-frame-check/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({executablePath:process.env.PM_BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
  const failures = [];
  for (const width of [375,1440]) {
    const page = await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror', e=>errors.push(e.message));
    await page.goto('http://localhost:8080/index-experimentell.html', {waitUntil:'networkidle'});
    await page.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}html{scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important}'});
    await page.locator('#gutscheine').scrollIntoViewIfNeeded();
    await page.evaluate(()=>document.querySelector('.vouchers-grid').classList.add('spread'));
    await page.waitForTimeout(100);
    const result = await page.evaluate(()=>{
      const issues=[];
      const frames=[...document.querySelectorAll('.preview-frame-host')];
      if(!frames.length) issues.push('no corrected frame outlines found');
      for(const host of frames) {
        const target=innerWidth<900 && host.matches('.about-figure,.course-media') ? host.querySelector('img') : host;
        const a=target.getBoundingClientRect(), h=host.getBoundingClientRect(), cs=getComputedStyle(host), ps=getComputedStyle(host,'::before');
        if(!a.width || !a.height) continue;
        const b={left:h.left+parseFloat(cs.borderLeftWidth)+parseFloat(ps.left),top:h.top+parseFloat(cs.borderTopWidth)+parseFloat(ps.top),right:h.right-parseFloat(cs.borderRightWidth)-parseFloat(ps.right),bottom:h.bottom-parseFloat(cs.borderBottomWidth)-parseFloat(ps.bottom)};
        const delta=Math.max(Math.abs(a.left-b.left),Math.abs(a.top-b.top),Math.abs(a.right-b.right),Math.abs(a.bottom-b.bottom));
        if(delta>.15) issues.push(`${host.className}: contour inset ${delta.toFixed(2)}px`);
        if(ps.content==='none') issues.push(`${host.className}: missing contour`);
      }
      for(const el of document.querySelectorAll('.voucher,.services,.reviews,.review,.hours')) {
        if(!el.classList.contains('preview-frame-host')) issues.push(`missing frame coverage: ${el.className}`);
      }
      const cards=[...document.querySelectorAll('.voucher')];
      const hint=document.querySelector('.voucher-hint').getBoundingClientRect();
      const bottom=Math.max(...cards.map(x=>x.getBoundingClientRect().bottom));
      if(hint.top-bottom<16) issues.push(`voucher text clearance ${(hint.top-bottom).toFixed(2)}px, expected >=16px`);
      for(const card of cards){
        const r=card.getBoundingClientRect();
        for(const child of card.children){
          if(child.matches('svg.frame-draw,svg.preview-frame')) continue;
          const c=child.getBoundingClientRect();
          if(c.right>r.right+.5 || c.bottom>r.bottom+.5) issues.push(`voucher content exceeds card: ${child.className}`);
        }
      }
      if(document.documentElement.scrollWidth>innerWidth) issues.push('horizontal page overflow');
      return issues;
    });
    await page.screenshot({path:`/tmp/pm-vouchers-${width}.png`});
    failures.push(...result.map(x=>`${width}px: ${x}`),...errors);
    await page.close();
  }
  await browser.close();
  console.log(failures.length? failures.join('\n') : 'PASS: frame bounds, voucher clearance/content and page width at 375/1440px');
  process.exitCode=failures.length?1:0;
})();
