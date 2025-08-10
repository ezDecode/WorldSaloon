'use server';
/**
 * @fileOverview A flow for creating a new testimonial.
 *
 * - createTestimonial - A function that handles creating a new testimonial.
 * - CreateTestimonialInput - The input type for the createTestimonial function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';
import 'dotenv/config';


// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const db = getFirestore();

const CreateTestimonialInputSchema = z.object({
  name: z.string(),
  quote: z.string(),
});

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialInputSchema>;

export async function createTestimonial(input: CreateTestimonialInput): Promise<void> {
  return createTestimonialFlow(input);
}

const createTestimonialFlow = ai.defineFlow(
  {
    name: 'createTestimonialFlow',
    inputSchema: CreateTestimonialInputSchema,
    outputSchema: z.void(),
  },
  async (testimonialData) => {
    try {
      const firstInitial = testimonialData.name.charAt(0).toUpperCase();
      await db.collection('testimonials').add({
        ...testimonialData,
        createdAt: FieldValue.serverTimestamp(), // Use Firestore server timestamp
        avatarUrl: `https://placehold.co/100x100/F5F5DC/333333.png?text=${firstInitial}`
      });
      console.log('Testimonial created successfully');
    } catch (error) {
      console.error('Error in createTestimonialFlow: ', error);
      // Re-throw a more informative error
      if (error instanceof Error) {
        throw new Error(`Failed to create testimonial: ${error.message}`);
      }
      throw new Error('Failed to create testimonial due to an unknown error.');
    }
  }
);
