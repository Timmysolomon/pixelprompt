'use client';

import Link from 'next/link';

export default function Button({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block px-8 py-3 bg-[#6366f1] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#4338ca] transition-all duration-300"
    >
      {children}
    </Link>
  );
}
