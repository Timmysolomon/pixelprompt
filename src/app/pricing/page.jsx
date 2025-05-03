'use client';

export default function PricingPage() {
  const handleCheckout = async (plan) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6">Pricing Plans</h1>
        <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
          Choose a plan that fits your creative needs. Upgrade to unlock more generations and exclusive features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="border border-zinc-800 bg-zinc-900 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-2">Free</h2>
            <p className="text-gray-400 mb-6">Basic access with limited generations</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
              <li>✔️ 10 images per day</li>
              <li>✔️ Pixel Art model only</li>
              <li>❌ No save history</li>
              <li>❌ No HD download</li>
            </ul>
            <button className="w-full bg-zinc-800 text-gray-400 py-2 rounded-md cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Starter Plan */}
          <div className="border border-purple-600 bg-zinc-950 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">Starter</h2>
            <p className="text-gray-400 mb-6">For hobbyists & indie developers</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
              <li>✔️ 200 images/month</li>
              <li>✔️ All model types</li>
              <li>✔️ Saved history</li>
              <li>❌ No commercial license</li>
            </ul>
            <button
              onClick={() => handleCheckout('starter')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition"
            >
              Upgrade – $9/month
            </button>
          </div>

          {/* Creator Plan */}
          <div className="border border-zinc-800 bg-zinc-900 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-2">Creator</h2>
            <p className="text-gray-400 mb-6">For professionals and small teams</p>
            <ul className="text-sm text-gray-300 mb-6 space-y-2 text-left">
              <li>✔️ Unlimited generations</li>
              <li>✔️ HD downloads</li>
              <li>✔️ Commercial use license</li>
              <li>✔️ Priority support</li>
            </ul>
            <button
              onClick={() => handleCheckout('creator')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
            >
              Upgrade – $19/month
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
