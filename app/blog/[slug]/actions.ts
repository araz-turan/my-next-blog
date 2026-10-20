'use server';

import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {deletePost, updatePost} from '@/lib/posts';
import {isAdmin} from '@/lib/session';
import {validatePost, type FormState} from '@/lib/validation';

export async function editPost(
  slug: string,
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  if (!(await isAdmin())) redirect('/login');

  const result = validatePost(formData);
  if (!result.ok) return result.state;

  const {title, excerpt, content, coverImage} = result.data;
  await updatePost(slug, {
    title,
    excerpt,
    content,
    coverImage: coverImage || null,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect(`/blog/${slug}`);
}

export async function removePost(slug: string) {
  if (!(await isAdmin())) redirect('/login');

  await deletePost(slug);

  revalidatePath('/blog');
  redirect('/blog');
}
