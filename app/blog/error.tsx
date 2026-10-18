'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className='max-w-2xl mx-auto p-8'>
      <h1 className='text-2xl font-bold'>Something went wrong</h1>
      <p className='mt-2 text-gray-600'>{error.message}</p>
      <button
        onClick={reset}
        className='mt-4 rounded border px-4 py-2 hover:bg-gray-100'
      >
        Try again
      </button>
    </main>
  );
}
