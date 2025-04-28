'use client';

export default function LandingFooter() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2c2c2c] py-6 px-6 text-center text-gray-500 text-sm">
      <p>
        © {new Date().getFullYear()} PixelPrompt. Built with ❤️ by Timilehin Osiyoku.
      </p>
    </footer>
  );
}
