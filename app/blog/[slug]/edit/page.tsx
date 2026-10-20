import {notFound, redirect} from 'next/navigation';
import PostForm from '@/components/PostForm';
import {getPostBySlug} from '@/lib/posts';
import {isAdmin} from '@/lib/session';
import {editPost} from '../actions';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  if (!(await isAdmin())) redirect('/login');

  const {slug} = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>Edit Post</h1>
      <PostForm
        action={editPost.bind(null, slug)}
        initial={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage ?? '',
        }}
        submitLabel='Save changes'
      />
    </main>
  );
}
