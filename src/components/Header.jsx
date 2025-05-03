'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-purple-400 text-xl font-bold">
        PixelPrompt
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/pricing" className="text-gray-300 hover:text-white text-sm">
          Pricing
        </Link>

        {session ? (
          <>
            <span className="text-sm text-gray-400 hidden sm:inline">Hi, {session.user.name.split(' ')[0]}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Login with Google
          </button>
        )}
      </nav>
    </header>
  );
}
