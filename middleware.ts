import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.headers.get('referer'));
  if(request.nextUrl.pathname.startsWith('/admin')){
    return NextResponse.rewrite(new URL('/', request.url))
  }else if (request.headers.get('referer') !== 'http://tprzybylski.pl/turniej9') {
    return NextResponse.redirect('http://tprzybylski.pl');
  } else {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}
