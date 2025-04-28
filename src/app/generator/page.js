'use client';

import { useState } from 'react';
import axios from 'axios';

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedImage('');

    try {
      const response = await axios.post('/api/generate', { prompt });
      const { get } = response.data.urls;

      let prediction;
      do {
        const res = await axios.get(get);
        prediction = res.data;
        await new Promise((r) => setTimeout(r, 1000));
      } while (prediction.status !== 'succeeded' && prediction.status !== 'failed');

      if (prediction.status === 'succeeded') {
        setGeneratedImage(prediction.output[0]);
      } else {
        console.error('Prediction failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-8">
      <h1 className="text-4xl font-bold text-[#6366f1] mb-4 animate-glow">PixelPrompt</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Describe your game asset or scene, and generate AI-powered sprites instantly.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your character, environment, or UI element..."
          className="w-full p-3 border border-gray-700 bg-[#111111] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          className="px-6 py-3 bg-[#6366f1] text-white rounded-lg hover:bg-[#4338CA] transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm mt-4">Generating your masterpiece...</p>
        </div>
      )}

      {generatedImage && (
        <div className="bg-[#111111] border border-[#2c2c2c] shadow-lg rounded-2xl p-6 w-full max-w-md text-center hover:shadow-blue-500/30 transition duration-500 animate-fade-in">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Pixel Art:</h2>
          <img
            src={generatedImage}
            alt="Generated Pixel Art"
            className="rounded-xl w-full h-auto mt-4"
          />
          <a
            href={generatedImage}
            download="pixelprompt-image.png"
            className="inline-block mt-4 px-6 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4338CA] transition duration-300"
          >
            Download Image
          </a>
        </div>
      )}
    </main>
  );
}
