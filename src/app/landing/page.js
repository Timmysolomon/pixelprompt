'use client';

import { useRouter } from 'next/navigation';

export default function LandingHero() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/generator'); // <-- FIXED: now it goes to /generator
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold animate-glow text-[#6366f1] mb-6">
        Welcome to PixelPrompt
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Instantly generate beautiful pixel art characters, environments, and UI elements for your indie games. 
        Powered by AI. Lightning fast. Professional quality.
      </p>
      <button
        onClick={handleEnter}
        className="px-8 py-4 bg-[#6366f1] text-white font-semibold rounded-lg hover:bg-[#4338CA] transition text-lg"
      >
        Enter PixelPrompt →
      </button>
    </main>
  );
}
