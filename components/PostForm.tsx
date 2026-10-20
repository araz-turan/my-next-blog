'use client';

import {useActionState} from 'react';
import type {FormState, PostInput} from '@/lib/validation';

type Props = {
  action: (
    prev: FormState | undefined,
    formData: FormData,
  ) => Promise<FormState>;
  initial?: PostInput;
  submitLabel: string;
};

const empty: PostInput = {title: '', excerpt: '', content: '', coverImage: ''};

export default function PostForm({
  action,
  initial = empty,
  submitLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const values = state?.values ?? initial;
  const errors = state?.errors ?? {};

  return (
    <form action={formAction} className='mt-8 space-y-4'>
      <div>
        <input
          name='title'
          placeholder='Title'
          defaultValue={values.title}
          className='w-full rounded border p-2'
        />
        {errors.title && (
          <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
        )}
      </div>

      <div>
        <input
          name='excerpt'
          placeholder='Short excerpt'
          defaultValue={values.excerpt}
          className='w-full rounded border p-2'
        />
        {errors.excerpt && (
          <p className='mt-1 text-sm text-red-600'>{errors.excerpt}</p>
        )}
      </div>

      <div>
        <input
          name='coverImage'
          placeholder='Cover image URL (optional)'
          defaultValue={values.coverImage}
          className='w-full rounded border p-2'
        />
        {errors.coverImage && (
          <p className='mt-1 text-sm text-red-600'>{errors.coverImage}</p>
        )}
      </div>

      <div>
        <textarea
          name='content'
          placeholder='Content'
          rows={8}
          defaultValue={values.content}
          className='w-full rounded border p-2'
        />
        {errors.content && (
          <p className='mt-1 text-sm text-red-600'>{errors.content}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={pending}
        className='rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50'
      >
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
