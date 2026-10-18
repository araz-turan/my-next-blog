import {notFound} from 'next/navigation';
import {getPostBySlug} from '@/lib/posts';
import LikeButton from '@/components/LikeButton';
import DislikeButton from '@/components/DislikeButton';
import Image from 'next/image';

export default async function PostPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>{post.title}</h1>
      <p className='mt-6 text-gray-800'>{post.content}</p>
      <LikeButton />
      <DislikeButton />

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={400}
          priority
          className='mt-6 h-64 w-full rounded object-cover'
        />
      )}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post?.title ?? 'Post not found',
    description: post?.excerpt,
  };
}
