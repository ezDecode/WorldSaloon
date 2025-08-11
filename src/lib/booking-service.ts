'use server';

import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { format, parseISO } from "date-fns";
import { db } from '@/lib/firebase-admin';
import { services } from '@/lib/data';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}/;
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const CreateBookingInputSchema = z
  .object({
    serviceId: z.number().int().nonnegative(),
    date: z
      .string()
      .regex(isoDateRegex, { message: 'date must be in ISO format YYYY-MM-DD' })
      .describe('The date of the appointment in ISO format.'),
    time: z
      .string()
      .regex(timeRegex, { message: 'time must be in HH:MM (24h) format' }),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z
      .string()
      .regex(/^[0-9+()\-\s]{7,20}$/, { message: 'phone must be a valid phone number' }),
    notes: z.string().max(1000).optional(),
    whatsappOptIn: z.boolean().optional(),
  })
  .strict();

export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;

const CreateBookingOutputSchema = z.object({
  bookingId: z.string(),
  message: z.string(),
});

export type CreateBookingOutput = z.infer<typeof CreateBookingOutputSchema>;

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingOutput> {
  const inputData = CreateBookingInputSchema.parse(input);
  
  try {
    const service = services.find((s) => s.id === inputData.serviceId);
    if (!service) {
      throw new Error('Invalid service ID');
    }

    const bookingData = {
      ...inputData,
      service: {
        name: service.name,
        duration: service.duration,
        price: service.price,
        bookingFee: service.bookingFee,
      },
    };

    const docRef = await db.collection('bookings').add({
      ...bookingData,
      createdAt: FieldValue.serverTimestamp(),
    });

    const barberEmail = process.env.BARBER_EMAIL || 'barber@example.com';
    const bookingDate = format(parseISO(bookingData.date), 'EEEE, d MMMM yyyy');
    const totalCost = bookingData.service.price + bookingData.service.bookingFee;

    const clientEmailBody = `
        Hi ${bookingData.name},

        Your appointment at Sardar Appointment is confirmed!
        We look forward to seeing you.

        Booking Details:
        - Service: ${bookingData.service.name}
        - Date: ${bookingDate}
        - Time: ${bookingData.time}
        - Notes: ${bookingData.notes || 'None'}

        Payment Summary:
        - Service Cost: ₹${bookingData.service.price}
        - Booking Fee: ₹${bookingData.service.bookingFee}
        - Total (to be paid at salon): ₹${totalCost}

        Thank you for booking with us!
        Sardar Appointment
      `;

    const barberEmailBody = `
        New Booking Notification:

        A new appointment has been scheduled.

        Client Details:
        - Name: ${bookingData.name}
        - Email: ${bookingData.email}
        - Phone: ${bookingData.phone}
        - Notes: ${bookingData.notes || 'None'}

        Appointment Details:
        - Service: ${bookingData.service.name}
        - Date: ${bookingDate}
        - Time: ${bookingData.time}
        - Duration: ${bookingData.service.duration} minutes
        - Quoted Price: ₹${totalCost}
        - WhatsApp Opt-in: ${bookingData.whatsappOptIn ? 'Yes' : 'No'}
      `;

    console.log('--- SIMULATING EMAIL TO CLIENT ---');
    console.log(`To: ${bookingData.email}`);
    console.log(`Subject: Your Appointment is Confirmed!`);
    console.log(`Body: ${clientEmailBody}`);
    console.log('----------------------------------');

    console.log('--- SIMULATING EMAIL TO BARBER ---');
    console.log(`To: ${barberEmail}`);
    console.log(`Subject: New Booking: ${bookingData.service.name} for ${bookingData.name}`);
    console.log(`Body: ${barberEmailBody}`);
    console.log('---------------------------------');

    return {
      bookingId: docRef.id,
      message: 'Booking created and confirmation prepared for client and barber.',
    };
  } catch (error) {
    console.error('Error in createBooking: ', error);
    if (error instanceof Error) {
      throw new Error(`Failed to create booking: ${error.message}`, { cause: error });
    }
    throw new Error('Failed to create booking due to an unknown error.');
  }
}
