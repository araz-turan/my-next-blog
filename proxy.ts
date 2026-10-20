import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {jwtVerify} from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  let valid = false;
  if (token && process.env.SESSION_SECRET) {
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.SESSION_SECRET),
      );
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/new', '/blog/:slug/edit'],
};
