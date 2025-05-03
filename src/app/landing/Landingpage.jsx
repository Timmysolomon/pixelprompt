'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-black text-white">
      <h1 className="text-5xl font-bold text-purple-400 mb-4 animate-glow">Welcome to PixelPrompt</h1>
      <p className="text-gray-400 max-w-xl mb-8">
        Instantly generate stunning pixel-style game assets powered by AI. Character sprites, environments, icons and more.
      </p>
      <button
        onClick={() => router.push('/generator')}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
      >
        Try PixelPrompt →
      </button>
    </main>
  );
}
