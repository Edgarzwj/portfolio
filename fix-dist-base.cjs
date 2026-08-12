// Rewrite public asset absolute paths in built files to include the
// GitHub Pages sub-path prefix (/portfolio/), so resources resolve under
// the project site. Idempotent: re-running only affects un-prefixed paths.
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const PREFIX = '/portfolio/';
const DIRS = ['textures', 'fonts', 'sounds', 'models', 'images', 'cursors'];

const exts = new Set(['.js', '.css', '.html']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (exts.has(path.extname(entry.name).toLowerCase())) {
      let txt = fs.readFileSync(full, 'utf8');
      let changed = false;
      for (const d of DIRS) {
        const re = new RegExp('(["\'])\\/' + d + '\\/', 'g');
        txt = txt.replace(re, (m, q) => q + PREFIX + d + '/');
        if (txt.includes(PREFIX + d + '/')) changed = true;
      }
      if (changed) fs.writeFileSync(full, txt);
    }
  }
}

walk(DIST);
console.log('dist asset paths rewritten with prefix', PREFIX);
