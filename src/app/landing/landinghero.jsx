'use client';

import Link from 'next/link';

export default function LandingHero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-glow">
        Welcome to PixelPrompt
      </h1>
      <p className="text-gray-400 mb-8 max-w-xl">
        Instantly generate beautiful pixel art characters, environments, and UI elements for your indie games. Powered by AI. Lightning fast. Professional quality.
      </p>
      <Link
        href="/generator"
        className="inline-block px-6 py-3 bg-[#6366f1] text-white rounded-lg hover:bg-[#4338CA] transition duration-300"
      >
        Enter PixelPrompt →
      </Link>
    </div>
  );
}
