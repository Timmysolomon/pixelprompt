'use client';
import { useState } from 'react';
import axios from 'axios';

export default function GeneratorPage() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { prompt: input });
      setImage(res.data?.image || '');
    } catch (err) {
      console.error('Error generating image:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-purple-400 drop-shadow-lg animate-glow">
          PixelPrompt Generator
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Describe your game asset or scene, and generate AI-powered pixel art.
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your character, scene, or object"
          className="w-full px-4 py-3 rounded-md bg-zinc-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {image && (
          <div className="mt-6">
            <img src={image} alt="Generated" className="w-full rounded-md border border-gray-700 shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
