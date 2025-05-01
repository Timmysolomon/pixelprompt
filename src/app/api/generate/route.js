import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const predictionInit = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
        input: {
          prompt,
          num_outputs: 1,
          guidance_scale: 7,
          num_inference_steps: 25,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = predictionInit.data;

    // Now poll the status endpoint until it completes
    let output = null;
    let attempts = 0;

    while (attempts < 10) {
      const statusRes = await axios.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      const status = statusRes.data;

      if (status.status === 'succeeded') {
        output = status.output;
        break;
      } else if (status.status === 'failed') {
        throw new Error('Prediction failed.');
      }

      // Wait 1.5 seconds between checks
      await new Promise((res) => setTimeout(res, 1500));
      attempts++;
    }

    if (!output) {
      return NextResponse.json({ error: 'Timeout waiting for image.' }, { status: 504 });
    }

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Prediction Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
