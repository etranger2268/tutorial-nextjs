'use client';

import { useEffect } from 'react';

type InvoicesErrorType = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function InvoicesError({ error, reset }: InvoicesErrorType) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleClick = () => reset();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <p className="text-sm text-gray-500">Error ID: {error?.digest}</p>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={handleClick}
      >
        Try again
      </button>
    </main>
  );
}
