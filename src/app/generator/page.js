'use client';
import { useState } from 'react';
import axios from 'axios';

const models = {
  pixel: {
    label: 'Pixel Art',
    description: 'Classic 2D pixel art for characters or scenes.',
    thumbnail: '/thumbnails/pixel.png',
    version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
  },
  spritesheet: {
    label: '3D Sprite Sheet',
    description: 'Top-down 3D game sprites with vibrant colors.',
    thumbnail: '/thumbnails/spritesheet.png',
    version: 'replace_with_sprite_model_version_hash',
  },
  concept: {
    label: 'Character Concept',
    description: 'High-res concept art of fantasy or sci-fi characters.',
    thumbnail: '/thumbnails/concept.png',
    version: 'replace_with_concept_model_version_hash',
  },
};

export default function GeneratorPage() {
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('pixel');
  const [showModelSelector, setShowModelSelector] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setImages([]);
    try {
      const res = await axios.post('/api/generate', {
        prompt: input,
        model: selectedModel,
        version: models[selectedModel].version,
      });
      setImages(res.data?.output || []);
    } catch (err) {
      console.error('Error generating image:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-purple-400 drop-shadow-lg animate-glow">
          PixelPrompt Generator
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Describe your game asset or scene, and generate AI-powered pixel art.
        </p>

        {/* Mobile Toggle */}
        <div className="w-full sm:hidden mb-4">
          <button
            onClick={() => setShowModelSelector(!showModelSelector)}
            className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 text-white rounded-md flex justify-between items-center"
          >
            <span>{models[selectedModel].label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${showModelSelector ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Model Selector */}
        <div className={`w-full ${!showModelSelector && 'hidden'} sm:block`}>
          <div className="space-y-2">
            {Object.entries(models).map(([key, { label, description, thumbnail }]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedModel(key);
                  setShowModelSelector(false);
                }}
                className={`flex items-center p-3 rounded-md cursor-pointer border ${
                  selectedModel === key
                    ? 'border-purple-500 bg-zinc-800'
                    : 'border-gray-700 bg-zinc-900'
                } hover:border-purple-400 transition`}
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={`${label} thumbnail`}
                    className="w-12 h-12 rounded-md mr-3 object-cover"
                  />
                )}
                <div>
                  <h4 className="text-white font-medium">{label}</h4>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
          className={`bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="animate-pulse">Generating</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          ) : (
            'Generate'
          )}
        </button>

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {images.map((imgUrl, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <img
                  src={imgUrl}
                  alt={`Generated ${idx + 1}`}
                  className="w-full rounded-md border border-gray-700 shadow-md"
                />
                <a
                  href={imgUrl}
                  download={`pixelprompt-image-${idx + 1}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
