const Footer = () => {
  return (
    <footer className="bg-footer-bg dark:bg-[var(--page-bg)] text-neutral-white dark:text-[var(--text-secondary)] py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="mb-2 transition-colors hover:text-accent-cta dark:hover:text-[var(--text-primary)] cursor-default">
            © 2024 My Azli Fresh. All rights reserved.
          </p>
          <p className="text-sm opacity-80 dark:opacity-70 transition-colors hover:text-accent-cta dark:hover:text-[var(--text-primary)] hover:opacity-100">
            Built with passion for fresh, sustainable food delivery.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

