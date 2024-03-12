import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(`referer: ${request.headers.get('referer')}`);
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/', request.url))
  } else if (request.headers.get('referer') === 'http://tprzybylski.pl/') {
    return NextResponse.rewrite(new URL('/', request.url));
  } else {
    return NextResponse.redirect('http://tprzybylski.pl');
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|text/plain|favicon.ico).*)']
}
