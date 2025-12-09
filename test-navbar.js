const http = require('http');

// Test NestJS server directly
http.get('http://localhost:3001/blog', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const navCount = (data.match(/<nav/g) || []).length;
    console.log('=== NestJS Server (port 3001) ===');
    console.log('Number of <nav> tags:', navCount);
    console.log('Contains "React NavBarDemo" comment:', data.includes('React NavBarDemo'));
    console.log('');
    
    // Test Next.js proxy
    http.get('http://localhost:3003/blog', (res2) => {
      let data2 = '';
      res2.on('data', (chunk) => { data2 += chunk; });
      res2.on('end', () => {
        const navCount2 = (data2.match(/<nav/g) || []).length;
        console.log('=== Next.js Proxy (port 3003) ===');
        console.log('Number of <nav> tags:', navCount2);
        console.log('Expected: 1 (React navbar only)');
        console.log('');
        
        if (navCount === 0 && navCount2 === 1) {
          console.log('✅ SUCCESS: Navbar duplication fixed!');
          console.log('- Server template has no navbar (React will render it)');
          console.log('- Final page has exactly 1 navbar');
        } else {
          console.log('❌ ISSUE DETECTED:');
          if (navCount > 0) console.log('- Server template still has navbar');
          if (navCount2 !== 1) console.log('- Final page has', navCount2, 'navbars (expected 1)');
        }
      });
    }).on('error', (err) => {
      console.log('Error testing Next.js:', err.message);
    });
  });
}).on('error', (err) => {
  console.log('Error testing NestJS:', err.message);
});
