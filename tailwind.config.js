/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Triadic Color Scheme - Using CSS Variables
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'primary-light': 'var(--color-primary-light)',
        'primary-medium': 'var(--color-primary-medium)',
        'primary-dark': 'var(--color-primary-dark)',
        'secondary-light': 'var(--color-secondary-light)',
        'secondary-medium': 'var(--color-secondary-medium)',
        'secondary-dark': 'var(--color-secondary-dark)',
        'accent-light': 'var(--color-accent-light)',
        'accent-medium': 'var(--color-accent-medium)',
        'accent-dark': 'var(--color-accent-dark)',
        'text-on-primary': 'var(--color-text-on-primary)',
        'text-on-secondary': 'var(--color-text-on-secondary)',
        'text-on-accent': 'var(--color-text-on-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'neutral-white': 'var(--color-neutral-white)',
        'neutral-light': 'var(--color-neutral-light)',
        // New Color Palette for Non-Hero Pages
        'primary-new': 'var(--color-primary-new)',
        'secondary-new': 'var(--color-secondary-new)',
        'neutral-bg-light': 'var(--color-neutral-bg-light)',
        'card-bg': 'var(--color-card-bg)',
        'heading-text': 'var(--color-heading-text)',
        'body-text': 'var(--color-body-text)',
        'accent-cta': 'var(--color-accent-cta)',
        'link-hover': 'var(--color-link-hover)',
        'error-alert': 'var(--color-error-alert)',
        // Legacy page-specific backgrounds (using new palette)
        'page-about-bg': 'var(--color-neutral-bg-light)',
        'page-contact-bg-left': 'var(--color-neutral-bg-light)',
        'page-contact-bg-right': 'var(--color-card-bg)',
        'footer-bg': 'var(--color-primary-new)',
        'blog-accent': 'var(--color-accent-cta)',
        // Legacy aliases for backward compatibility
        'heading': 'var(--color-text-primary)',
        'body': 'var(--color-text-secondary)',
        'white': 'var(--color-neutral-white)',
        'background-light': 'var(--color-neutral-light)',
        // shadcn color tokens
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
      },
      scale: {
        '84': '0.84',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        maxWidth: {
          'custom': '1200px',
        },
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}