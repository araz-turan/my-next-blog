'use server';

import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {addPost, slugify} from '@/lib/posts';
import {isAdmin} from '@/lib/session';
import {validatePost, type FormState} from '@/lib/validation';

export async function createPost(
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  if (!(await isAdmin())) redirect('/login');

  const result = validatePost(formData);
  if (!result.ok) return result.state;

  const {title, excerpt, content, coverImage} = result.data;

  const slug = slugify(title);
  if (!slug) {
    return {
      errors: {
        title: 'Title must contain at least one letter or number (a-z, 0-9)',
      },
      values: result.data,
    };
  }

  const post = await addPost({
    slug,
    title,
    excerpt,
    content,
    coverImage: coverImage || null,
  });

  revalidatePath('/blog');
  redirect(`/blog/${post.slug}`);
}
