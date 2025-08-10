'use server';
/**
 * @fileOverview A flow for creating a new testimonial.
 *
 * - createTestimonial - A function that handles creating a new testimonial.
 * - CreateTestimonialInput - the input type for the createTestimonial function.
 */

import { z } from 'zod';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import 'dotenv/config';


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

const CreateTestimonialInputSchema = z
  .object({
    name: z.string().min(2),
    quote: z.string().min(10),
  })
  .strict();

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialInputSchema>;

export async function createTestimonial(input: CreateTestimonialInput): Promise<void> {
  const testimonialData = CreateTestimonialInputSchema.parse(input);
  try {
    const firstInitial = testimonialData.name.charAt(0).toUpperCase();
    await db.collection('testimonials').add({
      ...testimonialData,
      createdAt: FieldValue.serverTimestamp(),
      avatarUrl: `https://placehold.co/100x100/F5F5DC/333333.png?text=${firstInitial}`,
    });
    console.log('Testimonial created successfully');
  } catch (error) {
    console.error('Error in createTestimonial: ', error);
    if (error instanceof Error) {
      // Preserve original stack and context
      throw new Error(`Failed to create testimonial: ${error.message}`, { cause: error });
    }
    throw new Error('Failed to create testimonial due to an unknown error.');
  }
}
