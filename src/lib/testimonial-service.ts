'use server';

import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '@/lib/firebase-admin';

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
      throw new Error(`Failed to create testimonial: ${error.message}`, { cause: error });
    }
    throw new Error('Failed to create testimonial due to an unknown error.');
  }
}
