import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/admin')){
    return NextResponse.rewrite(new URL('/', request.url))
  }else if (request.headers.get('referer') !== 'http://tprzybylski.pl') {
    return NextResponse.redirect('http://tprzybylski.pl');
  } else {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}
