# 🔐 Localhost Development Setup Guide

## Quick Start

Your `.env.local` file has been created with secure development credentials. The app should now work on localhost.

### Test Login Credentials (Development Only)
- **Email:** `dev@localhost.com`
- **Password:** `dev-password-123`

## Environment Variables Explained

### Required Variables

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `JWT_SECRET_KEY` | Signs and verifies JWT tokens | `src/lib/auth.ts`, `src/lib/auth-session.ts` |
| `ADMIN_EMAIL` | Admin login email | `src/app/api/auth/login/route.ts` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | `src/app/api/auth/login/route.ts` |

### Optional Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for metadata | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |

## 🔧 How to Generate Your Own Credentials

### 1. Generate a Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output to `JWT_SECRET_KEY` in `.env.local`

### 2. Hash Your Password

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_PASSWORD_HERE', 10).then(hash => console.log(hash))"
```

Copy the output to `ADMIN_PASSWORD_HASH` in `.env.local`

### 3. Set Your Email

Update `ADMIN_EMAIL` in `.env.local` to your preferred admin email.

## ✅ Verification Checklist

- [ ] `.env.local` file exists in project root
- [ ] All three required variables are set
- [ ] `.env.local` is listed in `.gitignore` (already configured)
- [ ] Server starts without errors: `npm run dev`
- [ ] Login works at `/admin/login`
- [ ] No hardcoded secrets in source code

## 🚨 Security Rules

### ✅ DO
- Use `.env.local` for local development
- Generate unique secrets for each environment
- Keep `.env.local` out of version control
- Use strong passwords in production

### ❌ DON'T
- Commit `.env.local` to git
- Share your `.env.local` file
- Use development credentials in production
- Reuse JWT secrets across environments

## 🌍 Production Deployment

For production (Vercel, etc.), set environment variables in your hosting platform:

1. Go to your project settings
2. Add environment variables:
   - `JWT_SECRET_KEY` (generate a new one!)
   - `ADMIN_EMAIL` (your real admin email)
   - `ADMIN_PASSWORD_HASH` (hash of your real password)
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
   - `NODE_ENV=production`

3. Never use the same secrets as development

## 🐛 Troubleshooting

### Error: "JWT_SECRET_KEY environment variable is required"
- Ensure `.env.local` exists in project root
- Restart your dev server after creating `.env.local`
- Check that the variable name is spelled correctly

### Error: "Invalid credentials" on login
- Verify `ADMIN_EMAIL` matches your login email (case-insensitive)
- Ensure `ADMIN_PASSWORD_HASH` is a valid bcrypt hash
- Check that you're using the correct password

### Server won't start
- Delete `.next` folder: `rm -rf .next` (or `rmdir /s /q .next` on Windows)
- Clear node_modules and reinstall: `npm install`
- Check for port conflicts (default: 3001)

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
