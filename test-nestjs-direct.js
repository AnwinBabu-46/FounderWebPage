const http = require('http');

http.get('http://localhost:3001/blog', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('=== Testing NestJS server directly (port 3001) ===\n');
    
    // Find the body tag area
    const bodyStart = data.indexOf('<body>');
    const mainStart = data.indexOf('<main');
    
    if (bodyStart > -1 && mainStart > -1) {
      const betweenBodyAndMain = data.substring(bodyStart, mainStart + 100);
      console.log('Content between <body> and <main>:');
      console.log(betweenBodyAndMain);
      console.log('\n---\n');
    }
    
    // Check for navbar
    const hasOldNavbar = data.includes('bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0');
    const hasComment = data.includes('React NavBarDemo');
    
    console.log(`Old server navbar present: ${hasOldNavbar ? '❌ YES' : '✅ NO'}`);
    console.log(`React comment present: ${hasComment ? '✅ YES' : '❌ NO'}`);
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
