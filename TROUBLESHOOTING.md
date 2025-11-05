# Troubleshooting Guide

## Common Issues & Solutions

### 1. Founder Image Not Showing
**Issue**: Image placeholder shows "JP" instead of photo
**Solution**: 
- Ensure image is at: `public/images/founder.jpg`
- Supported formats: JPG, PNG, WebP, AVIF
- Check file permissions

### 2. Navbar Not Changing Color on Scroll
**Issue**: Navbar stays same color when scrolling
**Solution**:
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for JavaScript errors
- Ensure you're on the home page (pathname === '/')

### 3. Buttons Not Working
**Issue**: Buttons don't respond to clicks
**Solution**:
- Check browser console for errors
- Verify JavaScript is enabled
- Clear browser cache

### 4. Blog Navigation Not Working
**Issue**: "View All Posts" doesn't scroll or navigate
**Solution**:
- Ensure BlogSection has `id="blog"`
- Check browser console for errors
- Try clicking the link directly

### 5. Build Errors
**Issue**: Webpack warnings or build failures
**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### 6. Styles Not Applying
**Issue**: Colors or styles not showing correctly
**Solution**:
- Clear browser cache
- Restart dev server: `npm run dev`
- Check if Tailwind is compiling correctly

## Quick Diagnostic Steps

1. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for red error messages
   - Share any errors you see

2. **Clear Cache**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies (if needed)
   rm -rf node_modules
   npm install
   ```

3. **Restart Dev Server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

4. **Verify Image Path**:
   - Check if `public/images/founder.jpg` exists
   - Verify file permissions
   - Try different image format

## What to Check

Please specify which feature isn't working:
- [ ] Founder image not displaying
- [ ] Navbar color not changing on scroll
- [ ] Buttons not working/styled correctly
- [ ] Blog navigation not working
- [ ] Roadmap/timeline not displaying correctly
- [ ] Other (please describe)

## Need Help?

Share:
1. What specific feature isn't working
2. Browser console errors (if any)
3. Screenshot of the issue
4. Steps to reproduce

