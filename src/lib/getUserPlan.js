import supabase from './supabaseAdmin';

export async function getUserPlan(email) {
  const { data, error } = await supabase
    .from('users')
    .select('stripe_subscription_status, stripe_price_id')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Failed to fetch plan:', error);
    return { status: 'free', priceId: null };
  }

  return {
    status: data.stripe_subscription_status || 'free',
    priceId: data.stripe_price_id,
  };
}
