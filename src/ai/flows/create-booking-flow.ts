'use server';
/**
 * @fileOverview A flow for creating a booking in Firestore and sending a confirmation.
 *
 * - createBooking - A function that handles creating a new booking.
 * - CreateBookingInput - The input type for the createBooking function.
 * - CreateBookingOutput - The return type for the createBooking function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { format, parseISO } from "date-fns";
import 'dotenv/config';
import { services } from '@/lib/data';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (process.env.GOOGLE_CLIENT_EMAIL && privateKey) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    // Fallback for environments where ADC is expected to work
    initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
}

const db = getFirestore();

const CreateBookingInputSchema = z.object({
  serviceId: z.number(),
  date: z.string().describe('The date of the appointment in ISO format.'),
  time: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  notes: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;

const CreateBookingOutputSchema = z.object({
  bookingId: z.string(),
  message: z.string(),
});

export type CreateBookingOutput = z.infer<typeof CreateBookingOutputSchema>;

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingOutput> {
  return createBookingFlow(input);
}

const createBookingFlow = ai.defineFlow(
  {
    name: 'createBookingFlow',
    inputSchema: CreateBookingInputSchema,
    outputSchema: CreateBookingOutputSchema,
  },
  async (inputData) => {
    try {
      const service = services.find(s => s.id === inputData.serviceId);
      if (!service) {
          throw new Error('Invalid service ID');
      }

      const bookingData = {
        ...inputData,
        service: { // Reconstruct what's needed for storage and emails
            name: service.name,
            duration: service.duration,
            price: service.price,
            bookingFee: service.bookingFee,
        }
      };
      
      const docRef = await db.collection('bookings').add({
        ...bookingData,
        createdAt: new Date().toISOString(),
      });
      
      const barberEmail = process.env.BARBER_EMAIL || 'barber@example.com';
      const bookingDate = format(parseISO(bookingData.date), "EEEE, d MMMM yyyy");
      const totalCost = bookingData.service.price + bookingData.service.bookingFee;

      // Email to Client
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

      // Email to Barber
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
      `;

      console.log("--- SIMULATING EMAIL TO CLIENT ---");
      console.log(`To: ${bookingData.email}`);
      console.log(`Subject: Your Appointment is Confirmed!`);
      console.log(`Body: ${clientEmailBody}`);
      console.log("----------------------------------");

      console.log("--- SIMULATING EMAIL TO BARBER ---");
      console.log(`To: ${barberEmail}`);
      console.log(`Subject: New Booking: ${bookingData.service.name} for ${bookingData.name}`);
      console.log(`Body: ${barberEmailBody}`);
      console.log("---------------------------------");


      return {
        bookingId: docRef.id,
        message: 'Booking created and confirmation prepared for client and barber.',
      };
    } catch (error) {
      console.error('Error in createBookingFlow: ', error);
      if (error instanceof Error) {
        throw new Error(`Failed to create booking: ${error.message}`);
      }
      throw new Error('Failed to create booking due to an unknown error.');
    }
  }
);
