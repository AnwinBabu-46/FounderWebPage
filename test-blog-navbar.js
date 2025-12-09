const http = require('http');

console.log('Testing blog page for navbar duplication...\n');

// Wait a bit for servers to be ready
setTimeout(() => {
  http.get('http://localhost:3000/blog', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const navCount = (data.match(/<nav/g) || []).length;
      const hasDoctype = data.startsWith('<!DOCTYPE html>');
      const hasNextJsLayout = data.includes('__next') || data.includes('_next');
      
      console.log('=== Blog Page Test Results ===');
      console.log(`Status: ${res.statusCode}`);
      console.log(`Number of <nav> tags: ${navCount}`);
      console.log(`Has DOCTYPE at start: ${hasDoctype}`);
      console.log(`Has Next.js markers: ${hasNextJsLayout}`);
      console.log('');
      
      if (navCount === 1 && hasDoctype && !hasNextJsLayout) {
        console.log('✅ SUCCESS: Blog page has exactly 1 navbar');
        console.log('✅ Blog is served directly from NestJS (no Next.js wrapper)');
      } else if (navCount > 1) {
        console.log(`❌ FAILED: Found ${navCount} navbars (expected 1)`);
      } else if (hasNextJsLayout) {
        console.log('❌ FAILED: Next.js layout is still wrapping the blog');
      } else {
        console.log('✅ Blog navbar looks good!');
      }
    });
  }).on('error', (err) => {
    console.log('❌ Error:', err.message);
    console.log('Make sure both servers are running:');
    console.log('  Terminal 1: npm run dev (Next.js on port 3000)');
    console.log('  Terminal 2: npm run start:blog (NestJS on port 3001)');
  });
}, 1000);
