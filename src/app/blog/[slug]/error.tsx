'use client'

import { useEffect } from 'react'
import NotFound404 from '@/components/ui/not-found-404'

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog post error:', error)
  }, [error])

  return (
    <div>
      <NotFound404
        title="Something went wrong"
        description="An error occurred while loading this blog post. Please try again."
      />
    </div>
  )
}

