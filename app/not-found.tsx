import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='mt-2 text-gray-600'>This page could not be found.</p>
      <Link href='/' className='mt-4 inline-block underline'>
        Back to home
      </Link>
    </main>
  );
}
