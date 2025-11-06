# Founder Portfolio Website

A modern, responsive portfolio website built with Next.js 14, showcasing the journey and achievements of Jamanudeen P, Founder of My Azli Fresh.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Blog Section**: Dynamic blog posts with markdown support
- **Contact Form**: Interactive contact form with validation
- **Social Integration**: Direct links to LinkedIn, Instagram, and email
- **Timeline**: Visual journey timeline
- **Media Mentions**: Showcase of press coverage and recognition
- **Scroll Progress**: Visual scroll progress indicator
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Forms**: React Hook Form
- **UI Components**: Custom components with Radix UI primitives

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FounderWebPage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
FounderWebPage/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── blog/              # Blog pages and routes
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── Blog/              # Blog section components
│   │   ├── Contact/           # Contact form and section
│   │   ├── Footer/            # Footer component
│   │   ├── Hero/              # Hero section
│   │   ├── Media/             # Media mentions section
│   │   ├── Mission/           # Mission statement section
│   │   ├── Shared/            # Shared utilities
│   │   ├── Timeline/           # Timeline component
│   │   └── ui/                # UI components
│   ├── data/                  # Static data files
│   ├── lib/                   # Utility functions
│   ├── styles/                # Global styles
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper utilities
├── public/                    # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json              # Project dependencies
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

## 🎨 Key Sections

### Hero Section
- Introduction and main headline
- Call-to-action buttons
- Smooth scroll navigation

### Timeline
- Visual journey timeline
- Key milestones and achievements
- Interactive timeline cards

### Mission Section
- Company mission and vision
- Core values and principles

### Blog Section
- Dynamic blog posts
- Individual blog post pages
- Blog index page

### Media Mentions
- Press coverage
- Awards and recognition
- Media highlights

### Contact Section
- Contact form with validation
- Email: Jaman@myazlifresh.com
- Social media links (LinkedIn, Instagram)
- Location information

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
```

### Tailwind CSS
The project uses Tailwind CSS with custom colors:
- `dark-blue`: #0A2E63
- `leaf-green`: #4CAF50

Custom configurations can be found in `tailwind.config.js`.

## 📱 Responsive Breakpoints

- Mobile: Default (< 640px)
- Tablet: `sm:` (640px+)
- Desktop: `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)

## 🚀 Deployment

### Automated Vercel Deployment

This project includes automated deployment scripts for streamlined Vercel deployments with safety checks and rollback capabilities.

#### Quick Start

**Deploy to Vercel:**
```powershell
.\deploy.ps1
```

**With custom commit message:**
```powershell
.\deploy.ps1 -CommitMessage "Your custom commit message"
```

**Skip backup branch creation:**
```powershell
.\deploy.ps1 -SkipBackup
```

#### Deployment Script Features

The `deploy.ps1` script automates the entire deployment workflow:

1. **Pre-flight Checks**
   - Verifies Git installation and repository status
   - Checks for uncommitted changes
   - Validates current branch (warns if not on main/master)
   - Confirms remote repository configuration

2. **Backup Branch Creation**
   - Automatically creates a timestamped backup branch (`pre-vercel-update-YYYYMMDD-HHMMSS`)
   - Allows quick rollback if deployment issues occur

3. **Build Validation**
   - Runs lint checks (`npm run lint`)
   - Runs build process (`npm run build`)
   - Prevents deployment if validation fails

4. **Automated Commit & Push**
   - Stages all changes
   - Commits with specified message (default: "Automated deployment to Vercel")
   - Pushes to GitHub, triggering Vercel auto-deployment

5. **Post-Deployment Checklist**
   - Displays verification checklist
   - Provides rollback instructions if needed

#### Rollback Procedure

If a deployment fails or causes issues:

**Quick Rollback:**
```powershell
.\rollback.ps1
```

The rollback script will:
1. List all available backup branches
2. Allow you to select which backup to restore
3. Force push to main, triggering Vercel to redeploy the previous version

**Manual Rollback:**
If you need to manually rollback:
```bash
# Checkout the backup branch
git checkout pre-vercel-update-YYYYMMDD-HHMMSS

# Reset main to the backup
git checkout main
git reset --hard pre-vercel-update-YYYYMMDD-HHMMSS
git push origin main --force
```

#### Deployment Verification Checklist

After deployment, verify:

- [ ] Check Vercel dashboard for deployment status
- [ ] Verify the live site loads correctly
- [ ] Test all main pages and navigation
- [ ] Verify responsive design on mobile/tablet
- [ ] Check blog posts are loading correctly
- [ ] Test contact form functionality
- [ ] Verify all images and assets load
- [ ] Check browser console for errors

#### Troubleshooting

**Deployment script fails during lint/build:**
- Fix the reported errors
- Run `npm run lint` and `npm run build` manually to verify
- Re-run `.\deploy.ps1`

**Push fails:**
- Check your Git credentials and network connection
- Verify you have push permissions to the repository
- Ensure the remote is correctly configured

**Rollback script can't find backup branches:**
- Backup branches may not exist if `--SkipBackup` was used
- Check available branches: `git branch -a | grep pre-vercel-update`
- Manually checkout a previous commit or branch

**Vercel deployment not triggering:**
- Verify Vercel is connected to your GitHub repository
- Check Vercel dashboard for deployment status
- Ensure you're pushing to the branch monitored by Vercel (usually `main`)

### Manual Vercel Deployment

For manual deployment:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the project and deploy the output:
```bash
npm run build
npm run start
```

## 📄 License

This project is private and proprietary.

## 👤 Author

**Jamanudeen P**
- Email: Jaman@myazlifresh.com
- LinkedIn: [jamanudeenp](https://www.linkedin.com/in/jamanudeenp/)
- Instagram: [@jamanudeenp](https://www.instagram.com/jamanudeenp)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by modern design principles
- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)

---

**My Azli Fresh** - Connecting communities through fresh, local produce.
