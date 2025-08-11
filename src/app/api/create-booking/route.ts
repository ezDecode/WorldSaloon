import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createBooking } from '@/lib/booking-service';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}/;
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const CreateBookingInputSchema = z
  .object({
    serviceId: z.number().int().nonnegative(),
    date: z.string().regex(isoDateRegex),
    time: z.string().regex(timeRegex),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^[0-9+()\-\s]{7,20}$/),
    notes: z.string().max(1000).optional(),
    whatsappOptIn: z.boolean().optional(),
  })
  .strict();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CreateBookingInputSchema.parse(body);
    const result = await createBooking(input);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    // Error in create-booking route
    if (error && typeof error === 'object' && 'issues' in (error as any)) {
      return NextResponse.json({ error: 'Invalid request', details: (error as any).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}