import { buffer } from 'micro';
import Stripe from 'stripe';
import supabase from '@/lib/supabaseAdmin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const rawBody = await buffer(req.body);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook Error', { status: 400 });
  }

  const session = event.data.object;

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.updated':
      const customerId = session.customer;

      // Get subscription object if it's not provided in session
      const subscription = event.type === 'checkout.session.completed'
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session;

      const email = session?.customer_email || subscription?.metadata?.email;
      const priceId = subscription.items.data[0].price.id;
      let plan = 'free';

      if (priceId === 'price_1RKCAPCBNnAEX3z2lVHnI8qY') plan = 'starter';
      if (priceId === 'price_1RKCAlCBNnAEX3z26YIhkCDG') plan = 'creator';

      if (email) {
        await supabase
          .from('users')
          .upsert({
            email,
            stripe_customer_id: customerId,
            stripe_subscription_status: plan,
            stripe_price_id: priceId,
          }, { onConflict: ['email'] });
      }
      break;

    case 'customer.subscription.deleted':
      const sub = session;
      const userEmail = sub?.metadata?.email;

      if (userEmail) {
        await supabase
          .from('users')
          .update({ stripe_subscription_status: 'free' })
          .eq('email', userEmail);
      }
      break;
  }

  return new Response('Success', { status: 200 });
}
