import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname
 const protectedRoute = ['/login','/signup']
 console.log(request.nextUrl.pathname)
 if(protectedRoute.includes(path)){
     const token = request.cookies.get("token")
     if(token){
        return NextResponse.redirect(new URL('/',request.url))
     }
     else{
        return NextResponse.next()
     }
 }

 else if(path == '/profile' || path == '/profile/:id'){
     const token = request.cookies.get("token")
     if(token){
        return NextResponse.next()
     }
     else{
        return NextResponse.redirect(new URL('/login',request.url))
     }
 }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile","/profile/:path*","/login","/signup","/verifyemail"],
}