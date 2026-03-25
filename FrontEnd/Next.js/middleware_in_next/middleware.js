// import { NextResponse } from 'next/server'
 

// export function middleware(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }
 

// export const config = {
//   matcher: '/about/:path*',
// }


import { NextResponse } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}