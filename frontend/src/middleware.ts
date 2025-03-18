import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  const token = request.cookies.get('token')
  const user = request.cookies.get('user')
  const patient = request.cookies.get('patient')

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' && token && user) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } else if (pathname !== '/admin/login' && (!token || !user)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Patient routes
  if (pathname.startsWith('/patient')) {
    if (pathname === '/patient/login' && patient) {
      return NextResponse.redirect(new URL('/patient/dashboard', request.url))
    } else if (pathname !== '/patient/login' && !patient) {
      return NextResponse.redirect(new URL('/patient/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}