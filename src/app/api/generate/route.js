import supabase from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(req) {
  const body = await req.json();
  const { prompt, model, version } = body;

  const session = req.headers.get('x-user-email');
  if (!session) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const email = session;
  const today = new Date();
  today.setHours(0, 0, 0, 0);  // Set to start of day

  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  try {
    // Get user plan
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('stripe_subscription_status')
      .eq('email', email)
      .single();

    if (userErr) throw userErr;

    const plan = user?.stripe_subscription_status || 'free';

    // Check daily usage for today
    const { count: dailyCount, error: dailyCountErr } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', today.toISOString());

    if (dailyCountErr) throw dailyCountErr;

    // Check monthly usage
    const { count: monthlyCount, error: monthlyCountErr } = await supabase
      .from('generations')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', firstOfMonth.toISOString());

    if (monthlyCountErr) throw monthlyCountErr;

    // Check if user exceeds daily or monthly limits
    if (plan === 'free' && dailyCount >= 10) {
      return NextResponse.json({ error: 'Daily limit reached for Free plan' }, { status: 403 });
    }

    if (plan === 'starter' && monthlyCount >= 200) {
      return NextResponse.json({ error: 'Monthly limit reached for Starter plan' }, { status: 403 });
    }

    // Generate image via Replicate API
    const output = await replicate.run(`stability-ai/sdxl:${version}`, { input: { prompt } });

    // Log generation to Supabase
    await supabase.from('generations').insert([{ email }]);

    return NextResponse.json({ output });
  } catch (err) {
    console.error('Generation error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
