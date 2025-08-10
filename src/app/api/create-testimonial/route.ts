import { NextResponse } from 'next/server';
import { z } from 'genkit';
import { createTestimonial } from '@/ai/flows/create-testimonial-flow';

const CreateTestimonialInputSchema = z.object({
  name: z.string(),
  quote: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateTestimonialInputSchema.parse(body);
    await createTestimonial(input);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error in create-testimonial route:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}