'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after a short delay
    const timer = setTimeout(() => {
      router.push('/generator');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-400 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
        Your subscription is now active. You’ll be redirected to the PixelPrompt generator shortly.
      </p>
      <button
        onClick={() => router.push('/generator')}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md text-white font-semibold transition"
      >
        Go to Generator Now
      </button>
    </main>
  );
}