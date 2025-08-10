import { Scissors, Sparkles, Star, User } from 'lucide-react';
import type { Service } from '@/types';
import { isBefore, set, startOfDay } from 'date-fns';

export const services: Service[] = [
  { id: 1, name: "Men's Haircut", duration: 30, price: 250, bookingFee: 25, icon: Scissors },
  { id: 2, name: "Beard Trim & Shape", duration: 20, price: 150, bookingFee: 25, icon: Sparkles },
  { id: 3, name: "Haircut & Shave", duration: 50, price: 400, bookingFee: 25, icon: Star },
  { id: 4, name: "Head Shave", duration: 25, price: 200, bookingFee: 25, icon: User },
];

export const getAvailableTimeSlots = (date: Date): string[] => {
  if (!date) return [];

  const dayOfWeek = date.getDay();
  // No slots on Sunday
  if (dayOfWeek === 0) return [];

  const now = new Date();
  const today = startOfDay(now);
  const selectedDay = startOfDay(date);
  
  const allSlots = [];
  // Weekday hours: 10 AM to 8 PM
  for (let hour = 10; hour < 20; hour++) {
    allSlots.push(`${hour}:00`);
    allSlots.push(`${hour}:30`);
  }
  allSlots.pop(); // Remove last slot to end at 7:30 PM

  // If the selected date is not today, return all slots
  if (!isBefore(selectedDay, today) && selectedDay.getTime() !== today.getTime()) {
      return allSlots;
  }

  // If it is today, filter out past slots
  const availableSlots = allSlots.filter(time => {
    const [hour, minute] = time.split(':').map(Number);
    const slotTime = set(date, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 });
    return isBefore(now, slotTime);
  });

  return availableSlots;
};
