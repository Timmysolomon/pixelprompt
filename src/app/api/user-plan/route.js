import supabase from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Safely extract and decode the email from query parameters
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const email = urlParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Query to get the user's subscription status
    const { data: user, error } = await supabase
      .from('users')
      .select('stripe_subscription_status')
      .eq('email', email)
      .single(); // .single() ensures only one row is returned

    if (error || !user) {
      console.error("User not found or error:", error);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user's subscription status
    return NextResponse.json({ status: user.stripe_subscription_status });
  } catch (err) {
    console.error("Error querying user plan:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
