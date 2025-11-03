import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalHeight) * 100

      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)

    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="progress-bar"
      style={{ width: `${scrollProgress}%` }}
    />
  )
}

export default ScrollProgress