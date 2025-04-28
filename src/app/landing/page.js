'use client';

import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/landing/generator');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8 text-white">
      <h1 className="text-5xl font-extrabold animate-glow mb-6">PixelPrompt</h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl text-lg">
        Instantly generate futuristic pixel art, ready to plug into your games.
      </p>
      <button
        onClick={handleEnter}
        className="px-8 py-4 bg-[#6366f1] text-white rounded-lg hover:bg-[#4338CA] transition text-lg font-semibold"
      >
        Enter PixelPrompt
      </button>

      {/* Pricing Section */}
      <section className="mt-20 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-6">Pricing</h2>
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-700 shadow-lg mb-6">
          <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">Free Plan ✅</h3>
          <p className="text-gray-400">Unlimited generations (for now!)</p>
        </div>
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-700 shadow-lg opacity-60 cursor-not-allowed">
          <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">Pro Plan 🚀 (Coming Soon)</h3>
          <p className="text-gray-400">Priority generations + Commercial Use License</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-600 text-sm">
        PixelPrompt © 2025
      </footer>
    </main>
  );
}
