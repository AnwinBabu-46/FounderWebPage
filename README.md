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

### Automated Deployment with PowerShell Scripts

This project includes automated deployment scripts for streamlined Vercel deployments with safety checks and rollback capabilities.

#### Quick Start

**Deploy to Vercel:**
```powershell
.\deploy.ps1
```

**Deploy with custom commit message:**
```powershell
.\deploy.ps1 -CommitMessage "Your custom commit message"
```

**Deploy skipping build checks (not recommended):**
```powershell
.\deploy.ps1 -SkipBuild
```

**Rollback to previous deployment:**
```powershell
.\rollback.ps1
```

#### Deployment Script Features

The `deploy.ps1` script automates the entire deployment workflow:

1. **Pre-flight Checks**
   - Verifies Git is installed and available
   - Confirms you're in a Git repository
   - Checks current branch status
   - Validates working tree state
   - Verifies remote synchronization

2. **Backup Branch Creation**
   - Automatically creates a backup branch (`pre-vercel-update`)
   - Timestamped backups if backup branch already exists
   - Enables quick rollback if needed

3. **Build & Lint Validation**
   - Runs `npm run lint` to check code quality
   - Runs `npm run build` to verify production build
   - Prevents deployment of broken builds
   - Can be skipped with `-SkipBuild` flag (not recommended)

4. **Automated Commit & Push**
   - Stages all changes
   - Commits with customizable message
   - Pushes to GitHub (triggers Vercel auto-deployment)

5. **Post-Deployment Verification Checklist**
   - Provides checklist of items to verify after deployment
   - Includes rollback instructions if needed

#### Rollback Procedure

If a deployment fails or introduces issues:

1. **Using the Rollback Script (Recommended):**
   ```powershell
   .\rollback.ps1
   ```
   - Lists available backup branches
   - Prompts for branch selection
   - Requires confirmation before force pushing
   - Automatically triggers Vercel redeployment

2. **Manual Rollback:**
   ```powershell
   git checkout pre-vercel-update
   git push origin pre-vercel-update:main --force
   ```

#### Deployment Flow

```
1. Validate repository state and branch
   ↓
2. Create backup branch (pre-vercel-update)
   ↓
3. Run integrity checks (lint, build)
   ↓
4. Stage and commit changes
   ↓
5. Push to GitHub (triggers Vercel auto-deployment)
   ↓
6. Display verification checklist
   ↓
7. Provide rollback instructions if needed
```

#### Verification Checklist

After deployment, verify:

- [ ] Check Vercel dashboard for deployment status
- [ ] Verify the build completed without errors
- [ ] Test the deployed site functionality
- [ ] Check all pages load correctly
- [ ] Verify all links and forms work
- [ ] Test responsive design on different devices
- [ ] Check for console errors in browser
- [ ] Verify environment variables are set correctly

#### Troubleshooting

**Issue: Script fails with "Git is not installed"**
- Solution: Install Git and ensure it's in your PATH

**Issue: "Working tree is not clean"**
- Solution: The script will automatically stage changes. Review staged changes before committing.

**Issue: "Build failed"**
- Solution: Fix build errors locally before deploying. Check `npm run build` output.

**Issue: "Lint checks failed"**
- Solution: Fix linting errors or use `-SkipBuild` flag (not recommended for production)

**Issue: "Push to GitHub failed"**
- Solution: Check your Git credentials and network connection. Backup branch is available for manual push.

**Issue: Need to rollback but no backup branch exists**
- Solution: Check Vercel dashboard for previous deployments and redeploy from there, or use Git history to revert.

#### Prerequisites

- Git installed and configured
- Node.js and npm installed
- PowerShell 5.1 or later (Windows) or PowerShell Core (cross-platform)
- GitHub repository connected
- Vercel project linked to GitHub repository

#### Vercel Configuration

The project includes `vercel.json` with the following configuration:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

Vercel will automatically detect Next.js and use these commands for deployment.

### Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Vercel Auto-Deployment:**
   - Vercel will automatically detect the push
   - Deployment will start automatically
   - Monitor the Vercel dashboard for status

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
