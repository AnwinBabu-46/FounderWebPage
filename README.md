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

### Vercel (Recommended)
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
