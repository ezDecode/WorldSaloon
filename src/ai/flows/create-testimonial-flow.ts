'use server';
/**
 * @fileOverview A flow for creating a new testimonial.
 *
 * - createTestimonial - A function that handles creating a new testimonial.
 * - CreateTestimonialInput - The input type for the createTestimonial function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';
import 'dotenv/config';


// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
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
      await db.collection('testimonials').add({
        ...testimonialData,
        createdAt: new Date(), // Use Firestore server timestamp for accuracy
        avatarUrl: `https://placehold.co/100x100.png?text=${testimonialData.name.charAt(0)}`
      });
      console.log('Testimonial created successfully');
    } catch (error) {
      console.error('Error in createTestimonialFlow: ', error);
      throw new Error('Failed to create testimonial.');
    }
  }
);
