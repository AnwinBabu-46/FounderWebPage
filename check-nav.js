const fs = require('fs');
const content = fs.readFileSync('dist/server/views/blog-index.hbs', 'utf8');
const lines = content.split('\n');

console.log('Searching for <nav tags in blog-index.hbs:');
lines.forEach((line, index) => {
  if (line.includes('<nav')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
