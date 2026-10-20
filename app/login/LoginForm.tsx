'use client';

import {useActionState} from 'react';
import {login} from './actions';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className='mt-8 space-y-4'>
      <input
        type='password'
        name='password'
        placeholder='Password'
        required
        className='w-full rounded border p-2'
      />
      {state?.error && <p className='text-red-600'>{state.error}</p>}
      <button
        type='submit'
        disabled={pending}
        className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'
      >
        {pending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
