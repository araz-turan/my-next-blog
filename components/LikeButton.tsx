'use client';

import {useState} from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className='mt-6 rounded border px-4 py-2 hover:bg-gray-100'
    >
      ❤️ {likes}
    </button>
  );
}
