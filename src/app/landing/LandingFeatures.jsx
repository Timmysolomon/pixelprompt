'use client';

const features = [
  {
    title: 'Instant Pixel Generation',
    description: 'Describe your vision and get ready-to-use pixel sprites, environments, or UI assets in seconds.',
  },
  {
    title: 'Built for Indie Devs',
    description: 'No complex setup. Just describe it → download it → drop into Unity, Unreal, or any engine.',
  },
  {
    title: 'Fast, Futuristic, Reliable',
    description: 'Our AI models ensure your pixel art looks clean, sharp, and consistent across all your game assets.',
  },
];

export default function LandingFeatures() {
  return (
    <section className="bg-[#111111] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Why PixelPrompt?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] border border-[#2c2c2c] rounded-2xl p-8 text-center hover:shadow-blue-500/20 transition duration-300 animate-fade-in"
            >
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
