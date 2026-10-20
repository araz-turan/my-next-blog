import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function createSession() {
  const token = await new SignJWT({admin: true})
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('7d')
    .sign(getKey());

  const store = await cookies();
  store.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function deleteSession() {
  const store = await cookies();
  store.delete('session');
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get('session')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getKey());
    return true;
  } catch {
    return false;
  }
}
