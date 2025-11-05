const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-bg-light">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-primary-new/20 border-t-primary-new rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-secondary-new/30 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>
        <p className="text-heading-text font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export default Loading

