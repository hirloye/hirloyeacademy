import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only protect the /admin path, but allow /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const hasAdminSession = request.cookies.has('admin_session')
    
    if (!hasAdminSession) {
      // Redirect to login if trying to access /admin without a session
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
}
