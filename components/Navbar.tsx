import Link from 'next/link';
import {isAdmin} from '@/lib/session';
import {logout} from '@/app/login/actions';

export default async function Navbar() {
  const admin = await isAdmin();
  return (
    <nav className='border-b'>
      <div className='max-w-2xl mx-auto p-4 flex gap-6'>
        <Link href='/' className='font-bold'>
          My Blog
        </Link>
        <Link href='/about' className='text-gray-600 hover:text-black'>
          About
        </Link>
        <Link href='/blog' className='text-gray-600 hover:text-black'>
          Blog
        </Link>
        {admin && (
          <Link href='/blog/new' className='text-gray-600 hover:text-black'>
            New Post
          </Link>
        )}
        <div className='ml-auto'>
          {admin ? (
            <form action={logout}>
              <button className='text-gray-600 hover:text-black'>Logout</button>
            </form>
          ) : (
            <Link href='/login' className='text-gray-600 hover:text-black'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
