import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  if (request.cookies.has('referer')) {
    return NextResponse
  } else {
    console.log(`referer: ${request.headers.get('referer')}`);

    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL('/', request.url))
    } else if (request.headers.get('referer') === 'http://tprzybylski.pl/') {
      let now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      const response = NextResponse.next()
      response.cookies.set({
        name: 'referer',
        value: 'referer',
        path: '/',
        expires: now,
      })
      return response;
    } else {
      return NextResponse.redirect('http://tprzybylski.pl');
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|text/plain|favicon.ico).*)']
}
