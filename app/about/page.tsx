import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>About</h1>
      <p className='mt-4 text-gray-600'>
        Hi, I'm a developer learning Next.js by building this blog.
      </p>
      <Image
        src='/fernando.jpg'
        alt='Fernando'
        width={160}
        height={160}
        className='mb-6 rounded-full'
      />
    </main>
  );
}
