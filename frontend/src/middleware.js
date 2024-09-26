import { NextResponse } from "next/server";

const authPaths = ['/account/login', '/account/register'];  // Add other account routes as needed
const protectedPaths = ['/user'];  // Protect all routes under '/user'
const accountPaths = ['/account/:path*'];  // All routes under '/account'

export async function middleware(request) {
    try {
        const isAuthenticated = request.cookies.get('is_auth')?.value;  // Read cookie
        const path = request.nextUrl.pathname;  // Get current path

        console.log('Current Path:', path);
        console.log('User is authenticated:', !!isAuthenticated);

        // 1. Redirect authenticated users away from the account section:
        if (isAuthenticated && path.startsWith('/account')) {
            console.log("Authenticated user trying to access account page. Redirecting to dashboard.");
            return NextResponse.redirect(new URL('/user/dashboard', request.url));
        }

        // 2. Redirect unauthenticated users trying to access protected user routes:
        if (!isAuthenticated && protectedPaths.some(protectedPath => path.startsWith(protectedPath))) {
            console.log("Unauthenticated user trying to access protected route. Redirecting to login.");
            return NextResponse.redirect(new URL('/account/login', request.url));
        }

        // 3. Allow access for all other cases
        return NextResponse.next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.error();
    }
};

export const config = {
    matcher: ['/user/:path*', '/account/:path*'],  // Match all routes under '/user' and '/account'
};
