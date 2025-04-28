import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const predictionResponse = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4', // Corrected model version
        input: {
          prompt: prompt,
        },
      },
      {
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = predictionResponse.data;
    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Error generating prediction:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
