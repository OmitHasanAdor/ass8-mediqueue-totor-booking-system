import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    if (!session) {
        const currentUrl = request.nextUrl.pathname;
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', currentUrl);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();

}

export const config = {
    matcher: ['/tutors/:path*', '/my-booked-sessions', '/add-tutors', '/my-tutors'],
}