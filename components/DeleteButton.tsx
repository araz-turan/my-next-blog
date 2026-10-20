'use client';

export default function DeleteButton() {
  return (
    <button
      type='submit'
      onClick={(e) => {
        if (!confirm('Delete this post? This cannot be undone.'))
          e.preventDefault();
      }}
      className='rounded border border-red-600 px-3 py-1 text-red-600 hover:bg-red-50'
    >
      Delete
    </button>
  );
}
