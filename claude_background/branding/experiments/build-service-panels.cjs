// npm install --prefix /tmp/pm-nail-build three@0.184.0 esbuild
// node claude_background/branding/experiments/build-service-panels.cjs /tmp/pm-nail-build/node_modules
const fs=require('node:fs'),path=require('node:path');
const modules=process.argv[2];if(!modules)throw Error('Pass node_modules with three@0.184.0 and esbuild.');
const esbuild=require(path.join(modules,'esbuild'));
const original=path.join(__dirname,'manicure-panels-3d.js');
(async()=>{
 await esbuild.build({entryPoints:[path.join(__dirname,'service-panels-3d.js')],outfile:path.resolve(__dirname,'../../../website/js/service-panels-3d.js'),banner:{js:'/*\n'+fs.readFileSync(path.join(modules,'three/LICENSE'),'utf8')+'\n*/'},bundle:true,minify:true,format:'iife',target:'es2020',legalComments:'inline',alias:{three:path.join(modules,'three')},plugins:[{
  name:'original-nail-renderer',setup(build){
   build.onResolve({filter:/^pm:original-nail$/},()=>({path:original,namespace:'pm-nail'}));
   build.onLoad({filter:/.*/,namespace:'pm-nail'},()=>{
    const source=fs.readFileSync(original,'utf8'),marker="const detail = document.querySelector('.detail');";
    const offset=source.indexOf(marker);if(offset<0)throw Error('Original nail entry marker changed.');
    let body=source.slice(offset+marker.length).replaceAll('document.documentElement.dataset.renderer','detail.dataset.renderer').replaceAll('document.documentElement.classList','detail.classList');
    body=body.replace('if (document.hidden) return;','if (document.hidden || !inViewport) return;');
    return{contents:source.slice(0,offset)+'\nexport function mountNail(detail) {\nlet inViewport=true;\nif ("IntersectionObserver" in window) new IntersectionObserver(es => {inViewport=es[0].isIntersecting;}).observe(detail);\n'+body+'\n}',loader:'js',resolveDir:__dirname};
   });
  }
 }]});
 console.log('Bundled all three service visualizations; original standalone HTML unchanged.');
})();
