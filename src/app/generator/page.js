'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';

const models = {
  pixel: {
    label: 'Pixel Art',
    description: 'Classic 2D pixel art for characters or scenes.',
    thumbnail: '/thumbnails/pixel.png',
    model: 'stability-ai/sdxl',
    version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
  },
  spritesheet: {
    label: '3D Sprite Sheet',
    description: 'Top-down 3D game sprites with vibrant colors.',
    thumbnail: '/thumbnails/spritesheet.png',
    model: 'your-spritesheet-model-name',
    version: 'replace_with_sprite_model_version_hash',
  },
  concept: {
    label: 'Character Concept',
    description: 'High-res concept art of fantasy or sci-fi characters.',
    thumbnail: '/thumbnails/concept.png',
    model: 'your-concept-model-name',
    version: 'replace_with_concept_model_version_hash',
  },
};

export default function GeneratorPage() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('pixel');
  const [error, setError] = useState('');
  const [plan, setPlan] = useState('free');
  const [usageToday, setUsageToday] = useState(0);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user-plan?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => data.status && setPlan(data.status));

      fetch(`/api/usage?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setUsageToday(data.usage || 0));
    }
  }, [session]);

  const handleGenerate = async () => {
    if (!session) return setError('Please log in to generate images.');
    if (!input.trim()) return;
    if (plan === 'free' && usageToday >= 10)
      return setError('Free plan limit reached. Upgrade to continue.');

    setLoading(true);
    setImages([]);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': session.user.email,
        },
        body: JSON.stringify({
          prompt: input,
          model: models[selectedModel].model,
          version: models[selectedModel].version,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setImages(data.output || []);
      setUsageToday((prev) => prev + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <Header />
      <div className="max-w-2xl w-full text-center mt-10 space-y-6">
        <h1 className="text-4xl font-bold text-purple-400 drop-shadow animate-glow">PixelPrompt Generator</h1>
        <p className="text-gray-400 text-lg">Plan: <span className="capitalize text-purple-300">{plan}</span></p>
        {plan !== 'creator' && (
          <p className="text-sm text-gray-500">{usageToday} of {plan === 'free' ? 10 : 200} used today</p>
        )}
        <p className="text-gray-300">Describe your character, item, or environment, and get pixel-perfect AI images.</p>

        <div className="bg-zinc-800 p-4 rounded border border-purple-500 text-sm text-left">
          <p className="font-semibold">Prompt ideas:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>&quot;A wizard casting a fireball in a dungeon&quot;</li>
            <li>&quot;Pixel art of a haunted house at night&quot;</li>
            <li>&quot;Futuristic HUD interface in pixel style&quot;</li>
          </ul>
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your prompt here..."
          className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 rounded text-white placeholder-gray-400"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {error && (
          <div className="text-red-500">
            <p>{error}</p>
            <button onClick={handleGenerate} className="text-blue-400 mt-2 underline">Retry</button>
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt={`Generated ${idx}`}
                  className="rounded shadow-md border border-gray-700 cursor-pointer"
                  onClick={() => setActiveImage(img)}
                  onContextMenu={(e) => e.stopPropagation()}
                />
                {plan === 'creator' ? (
                  <a
                    href={img}
                    download
                    className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded hover:bg-purple-700"
                  >
                    Download
                  </a>
                ) : (
                  <div className="absolute top-2 right-2 text-gray-500 text-xs bg-black/60 px-2 py-1 rounded">
                    Creator plan required
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50" onClick={() => setActiveImage(null)}>
            <img src={activeImage} alt="Expanded" className="max-w-[90%] max-h-[90%] rounded shadow-xl" />
          </div>
        )}
      </div>
    </div>
  );
}
