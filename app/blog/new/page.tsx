import {redirect} from 'next/navigation';
import {isAdmin} from '@/lib/session';
import {createPost} from './actions';

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect('/login');

  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-4xl font-bold'>New Post</h1>

      <form action={createPost} className='mt-8 space-y-4'>
        <input
          name='title'
          placeholder='Title'
          required
          className='w-full rounded border p-2'
        />
        <input
          name='excerpt'
          placeholder='Short excerpt'
          className='w-full rounded border p-2'
        />
        <input
          name='coverImage'
          placeholder='Cover image URL (images.unsplash.com, optional)'
          className='w-full rounded border p-2'
        />
        <textarea
          name='content'
          placeholder='Content'
          required
          rows={6}
          className='w-full rounded border p-2'
        />
        <button
          type='submit'
          className='rounded bg-black px-4 py-2 text-white hover:bg-gray-800'
        >
          Publish
        </button>
      </form>
    </main>
  );
}
