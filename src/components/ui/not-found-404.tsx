"use client"

import { ArrowLeft, Home, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"

interface NotFound404Props {
  title?: string
  description?: string
  className?: string
}

export default function NotFound404({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist. It may have been moved or deleted.",
  className,
}: NotFound404Props) {
  const handleHomeClick = () => {
    // Use window.location for reliable navigation
    if (typeof window !== 'undefined') {
      window.location.href = "/"
    }
  }

  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      // Check if there's history to go back to
      if (window.history.length > 1) {
        window.history.back()
      } else {
        // Fallback to home if no history
        window.location.href = "/"
      }
    }
  }

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center px-6",
        className
      )}
    >
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Ghost className="h-16 w-16 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-blue-500 bg-clip-text text-transparent">
            404
          </EmptyTitle>
          <EmptyDescription className="text-lg">{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button 
              onClick={handleHomeClick} 
              className="group cursor-pointer"
              type="button"
            >
              <Home className="h-4 w-4 mr-1 transition-transform group-hover:scale-110" />
              Go Home
            </Button>

            <Button 
              onClick={handleBackClick} 
              variant="outline" 
              className="group cursor-pointer"
              type="button"
            >
              <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}

