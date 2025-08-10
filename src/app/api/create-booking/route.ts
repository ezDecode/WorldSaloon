import { NextResponse } from 'next/server';
import { z } from 'genkit';
import { createBooking } from '@/ai/flows/create-booking-flow';

const CreateBookingInputSchema = z.object({
  serviceId: z.number(),
  date: z.string(),
  time: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateBookingInputSchema.parse(body);
    const result = await createBooking(input);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in create-booking route:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}