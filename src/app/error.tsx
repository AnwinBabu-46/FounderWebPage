'use client'

import { useEffect } from 'react'
import NotFound404 from '@/components/ui/not-found-404'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root error:', error)
  }, [error])

  return (
    <NotFound404
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
    />
  )
}

