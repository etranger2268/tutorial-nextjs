import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function EditIdPageNotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-2">
      <FaceFrownIcon className="size-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="bg-blue-500 rounded-md mt-4 px-4 py-2 text-white text-sm transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
