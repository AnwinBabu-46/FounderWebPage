import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  
  // Proxy blog requests to NestJS server
  if (pathname.startsWith('/blog')) {
    const nestJsUrl = `http://localhost:3001${pathname}${search}`
    
    try {
      const response = await fetch(nestJsUrl)
      const html = await response.text()
      
      // Return raw HTML from NestJS without Next.js layout
      return new NextResponse(html, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      })
    } catch (error) {
      console.error('Blog proxy error:', error)
      return new NextResponse('Blog service unavailable', { status: 503 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/blog/:path*',
}
