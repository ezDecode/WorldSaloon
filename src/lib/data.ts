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
