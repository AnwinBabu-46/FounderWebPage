const http = require('http');

// Test Next.js proxy to see the final rendered page
http.get('http://localhost:3003/blog', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('=== Testing /blog page (Next.js proxy on port 3003) ===\n');
    
    // Count all <nav> tags
    const allNavTags = data.match(/<nav[^>]*>/g) || [];
    console.log(`Total <nav> tags found: ${allNavTags.length}`);
    
    // Check for React navbar indicators
    const hasReactNavbar = data.includes('tubelight-navbar') || 
                           data.includes('NavBarDemo') ||
                           data.includes('fixed bottom-0 sm:top-0');
    
    // Check for old server navbar indicators
    const hasServerNavbar = data.includes('bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0');
    
    console.log(`\nNavbar Analysis:`);
    console.log(`- React navbar present: ${hasReactNavbar ? '✅ YES' : '❌ NO'}`);
    console.log(`- Server navbar present: ${hasServerNavbar ? '❌ YES (PROBLEM!)' : '✅ NO (GOOD!)'}`);
    
    // Show first 50 chars of each nav tag for context
    console.log(`\nNav tags found:`);
    allNavTags.forEach((tag, i) => {
      const preview = tag.substring(0, 80);
      console.log(`${i + 1}. ${preview}${tag.length > 80 ? '...' : ''}`);
    });
    
    console.log(`\n=== Result ===`);
    if (allNavTags.length === 1 && hasReactNavbar && !hasServerNavbar) {
      console.log('✅ SUCCESS: Only React navbar is present!');
    } else if (allNavTags.length > 1) {
      console.log(`⚠️  Multiple nav tags found (${allNavTags.length}). Check if duplication still exists.`);
    } else {
      console.log('❌ Issue detected. Review the navbar implementation.');
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
  console.log('Make sure Next.js is running on port 3003');
});
