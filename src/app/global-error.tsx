'use client'

import { useEffect } from 'react'
import NotFound404 from '@/components/ui/not-found-404'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <NotFound404
          title="Something went wrong"
          description="An unexpected error occurred. Please try again."
        />
      </body>
    </html>
  )
}

