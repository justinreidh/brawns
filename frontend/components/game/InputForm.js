'use client';

import { useState } from 'react';

export default function InputForm({ onSubmit, disabled, inputRef }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 my-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        className="p-2 text-center border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-full max-w-xs"
      />
      <button
        type="submit"
        disabled={disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 w-full max-w-xs"
      >
        Submit
      </button>
    </form>
  );
}