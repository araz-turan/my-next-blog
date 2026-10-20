'use server';

import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {addPost} from '@/lib/posts';
import {isAdmin} from '@/lib/session';

export async function createPost(formData: FormData) {
  if (!(await isAdmin())) redirect('/login');

  const title = String(formData.get('title') ?? '').trim();
  const excerpt = String(formData.get('excerpt') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const rawCover = String(formData.get('coverImage') ?? '').trim();
  const coverImage =
    rawCover.startsWith('https://images.unsplash.com/') ||
    rawCover.startsWith('/')
      ? rawCover
      : null;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  if (!title || !content || !slug) return;

  const post = await addPost({slug, title, excerpt, content, coverImage});

  revalidatePath('/blog');
  redirect(`/blog/${post.slug}`);
}
