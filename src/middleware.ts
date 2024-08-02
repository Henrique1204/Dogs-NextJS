import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	const isAuthenticated = token ? true : false;
	const isRedirectingToAccount = request.nextUrl.pathname.startsWith('/conta');

	if (!isAuthenticated && isRedirectingToAccount) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const isRedirectingToLogin = request.nextUrl.pathname.startsWith('/login');

	if (isAuthenticated && isRedirectingToLogin) {
		return NextResponse.redirect(new URL('/conta', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/conta/:path*', '/login/:path*'],
};
