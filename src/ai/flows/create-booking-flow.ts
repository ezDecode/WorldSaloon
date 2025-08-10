'use server';
/**
 * @fileOverview A flow for creating a booking in Firestore.
 *
 * - createBooking - A function that handles creating a new booking.
 * - CreateBookingInput - The input type for the createBooking function.
 * - CreateBookingOutput - The return type for the createBooking function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

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
  async (bookingData) => {
    try {
      const docRef = await db.collection('bookings').add({
        ...bookingData,
        createdAt: new Date().toISOString(),
      });
      console.log('Document written with ID: ', docRef.id);
      return {
        bookingId: docRef.id,
        message: 'Booking created successfully.',
      };
    } catch (error) {
      console.error('Error adding document: ', error);
      // It's better to throw an error that the client can catch
      throw new Error('Failed to create booking.');
    }
  }
);
