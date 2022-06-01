import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware (req: any) {
    //Yoken will exist if user is loggoed in
    const token = await getToken({req, secret: process.env.JWT_SECRET || ''});

    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();

    //Redirect them to home if is authenticated
    if (pathname.includes("/login") && token) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    //Allow the request if the following id true
    // 1) Its a request for next-auth session  &provider fetching
    // 2) the token exist
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    // Redirect them to login if they dont have token AND are requesting a protected route
    if (!token && pathname !== "/login") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
}