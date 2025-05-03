'use client';

import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Free',
    id: 'free',
    price: '$0/mo',
    features: [
      '10 generations per day',
      'Basic pixel art model',
      'History saved locally',
    ],
    button: 'Get Started',
  },
  {
    name: 'Starter',
    id: 'starter',
    price: '$9/mo',
    features: [
      '200 generations/month',
      'Access to more models',
      'Priority support',
    ],
    button: 'Upgrade to Starter',
  },
  {
    name: 'Creator',
    id: 'creator',
    price: '$19/mo',
    features: [
      'Unlimited generations',
      'All models unlocked',
      'HD downloads + image history',
      'Premium support',
    ],
    button: 'Upgrade to Creator',
  },
];

export default function PricingPage() {
  const router = useRouter();

  const handleCheckout = async (plan) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">Pricing Plans</h1>
        <p className="text-gray-300 mb-10 text-lg">
          Choose the plan that suits your needs. Upgrade anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-purple-300 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-white mb-4">{plan.price}</p>
              <ul className="text-gray-400 space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>&bull; {feature}</li>
                ))}
              </ul>
              {plan.id === 'free' ? (
                <button
                  onClick={() => router.push('/generator')}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md"
                >
                  {plan.button}
                </button>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.id)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                >
                  {plan.button}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
