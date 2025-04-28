'use client';

import Image from 'next/image';

export default function LandingDemo() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">See PixelPrompt in Action</h2>
        <p className="text-gray-400 mb-10">
          Type a description, click generate, and watch your futuristic pixel asset come to life instantly.
        </p>
        <div className="bg-[#111111] border border-[#2c2c2c] rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-fade-in">
          <Image
            src="/demo-placeholder.png" 
            alt="PixelPrompt Demo"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
