"use client";

import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog Listing Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="bg-red-50 text-red-800 p-8 rounded-2xl max-w-lg text-center border border-red-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-6 opacity-80">
          We encountered an error while loading the blogs. The API might be temporarily unreachable.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-100"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
