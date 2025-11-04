'use client'

import { useEffect } from 'react'
import NotFound404 from '@/components/ui/not-found-404'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog page error:', error)
  }, [error])

  return (
    <div>
      <NotFound404
        title="Something went wrong"
        description="An error occurred while loading the blog page. Please try again."
      />
    </div>
  )
}

