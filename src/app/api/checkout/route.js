import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  starter: 'price_1RKCAPCBNnAEX3z2lVHnI8qY', // $9/mo
  creator: 'price_1RKCAlCBNnAEX3z26YIhkCDG', // $19/mo
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { plan, email } = body;

    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      customer_email: email || undefined,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout route error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
