import {redirect} from 'next/navigation';
import {isAdmin} from '@/lib/session';
import PostForm from '@/components/PostForm';
import {createPost} from './actions';

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect('/login');

  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>New Post</h1>
      <PostForm action={createPost} submitLabel='Publish' />
    </main>
  );
}
