import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createTestimonial } from '@/ai/flows/create-testimonial-flow';

const CreateTestimonialInputSchema = z
  .object({
    name: z.string().min(2),
    quote: z.string().min(10),
  })
  .strict();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateTestimonialInputSchema.parse(body);
    await createTestimonial(input);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error in create-testimonial route:', error);
    if (error && typeof error === 'object' && 'issues' in (error as any)) {
      return NextResponse.json({ error: 'Invalid request', details: (error as any).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}