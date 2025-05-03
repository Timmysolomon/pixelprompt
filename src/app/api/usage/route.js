import supabase from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const { data, error } = await supabase
      .from('generations')
      .select('email', { count: 'exact' })
      .eq('email', email)
      .gte('created_at', today.toISOString());

    if (error) {
      console.error("Error fetching usage:", error);
      return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 });
    }

    return NextResponse.json({ usage: data.length });
  } catch (err) {
    console.error("Server error in /api/usage:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
