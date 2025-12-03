const http = require('http');

console.log('=== VERIFICATION TEST ===\n');

// Test 1: Check homepage
console.log('Test 1: Checking homepage (http://localhost:3000/)...');
http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const navCount = (data.match(/<nav/g) || []).length;
    const hasMetadata = data.includes('<meta name="description"');
    const hasReactNavbar = data.includes('tubelight-navbar') || data.includes('NavBarDemo');
    
    console.log(`  ✓ Status: ${res.statusCode}`);
    console.log(`  ✓ Nav count: ${navCount} (expected: 1)`);
    console.log(`  ✓ Has metadata: ${hasMetadata ? 'YES' : 'NO'} (expected: YES)`);
    console.log(`  ✓ Has React navbar: ${hasReactNavbar ? 'YES' : 'NO'} (expected: YES)`);
    
    if (navCount === 1 && hasMetadata && hasReactNavbar) {
      console.log('  ✅ Homepage PASSED\n');
    } else {
      console.log('  ❌ Homepage FAILED\n');
    }
    
    // Test 2: Check blog page
    console.log('Test 2: Checking blog page (http://localhost:3000/blog)...');
    http.get('http://localhost:3000/blog', (res2) => {
      let data2 = '';
      res2.on('data', (chunk) => { data2 += chunk; });
      res2.on('end', () => {
        const navCount2 = (data2.match(/<nav/g) || []).length;
        const hasServerNavbar = data2.includes('bg-white/80 backdrop-blur-md');
        const hasReactNavbar2 = data2.includes('tubelight-navbar');
        
        console.log(`  ✓ Status: ${res2.statusCode}`);
        console.log(`  ✓ Nav count: ${navCount2} (expected: 1)`);
        console.log(`  ✓ Has server navbar: ${hasServerNavbar ? 'YES' : 'NO'} (expected: YES)`);
        console.log(`  ✓ Has React navbar: ${hasReactNavbar2 ? 'YES' : 'NO'} (expected: NO)`);
        
        if (navCount2 === 1 && hasServerNavbar && !hasReactNavbar2) {
          console.log('  ✅ Blog page PASSED\n');
        } else {
          console.log('  ❌ Blog page FAILED\n');
        }
        
        console.log('=== SUMMARY ===');
        if (navCount === 1 && hasMetadata && navCount2 === 1 && hasServerNavbar && !hasReactNavbar2) {
          console.log('✅ ALL TESTS PASSED');
          console.log('- Homepage has React navbar with metadata');
          console.log('- Blog page has server navbar only (no duplication)');
        } else {
          console.log('❌ SOME TESTS FAILED - Review output above');
        }
      });
    }).on('error', (err) => {
      console.log(`  ❌ Error: ${err.message}`);
      console.log('  Make sure Next.js is running on port 3000');
    });
  });
}).on('error', (err) => {
  console.log(`  ❌ Error: ${err.message}`);
  console.log('  Make sure Next.js is running on port 3000');
});
