export default function Loading() {
  return (
    <main className='max-w-2xl mx-auto p-8'>
      <div className='h-10 w-40 animate-pulse rounded bg-gray-200' />
      <div className='mt-8 space-y-6'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='space-y-2'>
            <div className='h-6 w-3/4 animate-pulse rounded bg-gray-200' />
            <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200' />
          </div>
        ))}
      </div>
    </main>
  );
}
