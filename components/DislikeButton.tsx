'use client';

import {useState} from 'react';

export default function DislikeButton() {
  const [dislikes, setDislikes] = useState(0);

  return (
    <button
      onClick={() => setDislikes(dislikes + 1)}
      className='mt-6 rounded border px-4 py-2 hover:bg-gray-100 ml-5'
    >
      👎 {dislikes}
    </button>
  );
}
