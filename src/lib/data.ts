import { Scissors, Sparkles, Star, User } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  { id: 1, name: "Men's Haircut", duration: 30, price: 250, bookingFee: 25, icon: Scissors },
  { id: 2, name: "Beard Trim & Shape", duration: 20, price: 150, bookingFee: 25, icon: Sparkles },
  { id: 3, name: "Haircut & Shave", duration: 50, price: 400, bookingFee: 25, icon: Star },
  { id: 4, name: "Head Shave", duration: 25, price: 200, bookingFee: 25, icon: User },
];

export const getAvailableTimeSlots = (date: Date): string[] => {
  // Mock function to generate time slots. In a real app, this would query the backend.
  if (!date) return [];

  const dayOfWeek = date.getDay();
  // No slots on Sunday
  if (dayOfWeek === 0) return [];

  const slots = [];
  // Weekday hours: 10 AM to 8 PM
  for (let i = 10; i < 20; i++) {
    slots.push(`${i}:00`);
    slots.push(`${i}:30`);
  }
  // Remove last slot to end at 7:30 PM
  slots.pop();

  return slots;
};

export const testimonialsData = [
    {
        id: 1,
        name: "Rohan S.",
        quote: "Best haircut I've had in years. The attention to detail is incredible. I felt like a new man walking out of the shop. Highly recommended!",
        avatarUrl: "https://placehold.co/100x100.png"
    },
    {
        id: 2,
        name: "Jaspreet K.",
        quote: "Very professional and clean environment. The barber listened to exactly what I wanted and delivered perfectly. Will definitely be a regular customer.",
        avatarUrl: "https://placehold.co/100x100.png"
    },
    {
        id: 3,
        name: "Amanpreet G.",
        quote: "The booking process was so easy, and the service was even better. Great value for the quality you get. The hot towel shave is a must-try!",
        avatarUrl: "https://placehold.co/100x100.png"
    }
];
