import {getPosts} from '@/lib/posts';
import Link from 'next/link';
// import {posts} from '@/lib/posts';

export default async function BlogPage() {
  const posts = await getPosts();

  await new Promise((r) => setTimeout(r, 2000));

  // throw new Error('Test error');

  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>Blog</h1>

      <ul className='mt-8 space-y-6'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className='text-xl font-semibold hover:underline'
            >
              {post.title}
            </Link>
            <p className='text-gray-600'>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
