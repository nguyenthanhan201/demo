import { NextRequest, NextResponse } from 'next/server';

const authPaths = ['/admin', '/cart', '/login', '/user'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('90s_access_token');

  if (authPaths.some((path) => pathname.includes(path))) {
    const isRequiredAuthPath =
      pathname.includes('/admin') || pathname.includes('/cart') || pathname.includes('/user');

    if (!token && isRequiredAuthPath) {
      const url = new URL(`/login`, request.url);
      return NextResponse.redirect(url);
    }

    if (token && pathname.includes('/login')) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: authPaths.map((path) => `${path}(/:path*)?`)
};
