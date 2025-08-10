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
import { initializeApp, getApps } from 'firebase-admin/app';
import { format, parseISO } from "date-fns";
import 'dotenv/config';


// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

const ServiceSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.number(),
  price: z.number(),
});

const CreateBookingInputSchema = z.object({
  service: ServiceSchema,
  date: z.string().describe('The date of the appointment in ISO format.'),
  time: z.string(),
  name: z.string(),
  email: z.string(),
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
  async (bookingData) => {
    try {
      const docRef = await db.collection('bookings').add({
        ...bookingData,
        createdAt: new Date().toISOString(),
      });

      // Placeholder for sending email confirmation
      const confirmationMessage = 
`Hi ${bookingData.name}, your appointment at Sardar Appointment is confirmed!
Service: ${bookingData.service.name}
Date: ${format(parseISO(bookingData.date), "EEEE, d MMMM yyyy")}
Time: ${bookingData.time}
We look forward to seeing you!`;

      console.log("--- SIMULATING EMAIL ---");
      console.log(`To: ${bookingData.email}`);
      console.log(`Subject: Your Appointment is Confirmed!`);
      console.log(`Body: ${confirmationMessage}`);
      console.log("------------------------");


      return {
        bookingId: docRef.id,
        message: 'Booking created and confirmation prepared.',
      };
    } catch (error) {
      console.error('Error in createBookingFlow: ', error);
      throw new Error('Failed to create booking.');
    }
  }
);
