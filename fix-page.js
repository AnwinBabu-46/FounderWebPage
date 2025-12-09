const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(/import BlogSection from '\.\.\/components\/Blog\/BlogSection'\n/, '');
fs.writeFileSync('src/app/page.tsx', content);
console.log('Removed BlogSection import');
