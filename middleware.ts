import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {Logger, withAxiom} from "next-axiom";

// This function can be marked `async` if using `await` inside
async function middleware(request: NextRequest) {
  const log = new Logger();
  const {isAuthenticated} = getKindeServerSession();

  if (await isAuthenticated()) {
    return NextResponse.next();
  } else if (request.cookies.has('referer')) {
    if (
      request.nextUrl.pathname.startsWith('/api')  ||
      request.nextUrl.pathname === "/admin" ||
      request.nextUrl.pathname === "/etap1" ||
      request.nextUrl.pathname === "/etap1/results" ||
      request.nextUrl.pathname === "/etap2" ||
      request.nextUrl.pathname === "/etap2/preview" ||
      request.nextUrl.pathname === "/sponsors" ||
      request.nextUrl.pathname.startsWith('/_axiom')
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/etap2', request.url));
    }
  } else {
    if (request.nextUrl.pathname === "/admin" || request.headers.get('referer') === 'https://tprzybylski.pl/') {
      let now = new Date();
      now.setTime(now.getTime() + 24 * 3600 * 1000);
      const response = NextResponse.next();
      response.cookies.set({
        name: 'referer',
        value: 'referer',
        path: '/',
        expires: now,
      })
      return response;
    } else {
     log.info('Referer: ', {referer: request.headers.get('referer')});
      return NextResponse.redirect('https://tprzybylski.pl');
    }
  }
}

export default withAxiom(middleware);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
