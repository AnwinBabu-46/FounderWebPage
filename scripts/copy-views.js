const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../server/views');
const dest = path.join(__dirname, '../dist/server/views');

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
  });
  console.log('Views copied to dist/server/views');
} else {
  console.log('No views found in server/views');
}
