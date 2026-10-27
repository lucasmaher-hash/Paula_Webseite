/* Regenerate the self-contained HTML after editing manicure-panels-3d.js.
   npm install --prefix /tmp/pm-nail-build three@0.184.0 esbuild
   node branding/experiments/build-manicure-3d.cjs /tmp/pm-nail-build/node_modules */
const fs = require('node:fs');
const path = require('node:path');
const modules = process.argv[2];
if (!modules) throw new Error('Pass the absolute node_modules directory containing three@0.184.0 and esbuild.');
const esbuild = require(path.join(modules, 'esbuild'));
const output = esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'manicure-panels-3d.js')], bundle: true, minify: true,
  write: false, format: 'iife', target: 'es2020', legalComments: 'inline',
  alias: { three: path.join(modules, 'three') }
}).outputFiles[0].text.replaceAll('</script', '<\\/script');
const htmlPath = path.join(__dirname, 'manicure-panels.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const marker = '<script id="embedded-nail-renderer">';
const start = html.indexOf(marker) + marker.length;
const end = html.indexOf('</script>', start);
if (start < marker.length || end === -1) throw new Error('Embedded renderer marker missing.');
html = html.slice(0, start) + output + html.slice(end);
const license = fs.readFileSync(path.join(modules, 'three/LICENSE'), 'utf8');
if (!html.includes('THREE-MIT-LICENSE')) html = html.replace('</head>', '<!-- THREE-MIT-LICENSE\n' + license + '\n-->\n</head>');
fs.writeFileSync(htmlPath, html);
console.log('Updated standalone HTML (' + Buffer.byteLength(html) + ' bytes).');
