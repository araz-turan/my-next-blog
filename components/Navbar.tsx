import Link from 'next/link';

export default function Navbar() {
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
        <Link href='/blog/new' className='text-gray-600 hover:text-black'>
          New Post
        </Link>
      </div>
    </nav>
  );
}
