// app/me/page.tsx
'use client';

import React, { useState } from 'react';

export default function Me() {
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/me/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, isPublic }),
      });

      if (res.ok) {
        // 投稿完了メッセージを表示
        alert('投稿が完了しました');
        setContent('');
      } else {
        console.error('投稿に失敗しました。');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="mb-4 text-2xl font-bold">心境を投稿</h1>
      <div className="mb-4">
        <label htmlFor="content" className="mb-2 block font-bold text-gray-700">
          心境:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block font-bold text-gray-700">公開:</label>
        <div className="flex items-center">
          <input
            type="radio"
            id="public"
            name="isPublic"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
            className="mr-2"
          />
          <label htmlFor="public" className="text-gray-700">
            公開
          </label>
          <input
            type="radio"
            id="private"
            name="isPublic"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
            className="ml-4 mr-2"
          />
          <label htmlFor="private" className="text-gray-700">
            非公開
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        投稿
      </button>
    </form>
  );
}
