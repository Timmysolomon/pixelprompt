'use client';

import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-red-500 mb-4">Payment Canceled</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
        Your payment was not completed. You can return to the pricing page and try again at any time.
      </p>
      <button
        onClick={() => router.push('/pricing')}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md text-white font-semibold transition"
      >
        Back to Pricing
      </button>
    </main>
  );
}