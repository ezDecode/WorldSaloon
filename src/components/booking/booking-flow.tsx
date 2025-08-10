"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Booking, Service } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProgressBar } from './progress-bar';

const ServiceSelection = dynamic(() => import('./service-selection').then(m => m.ServiceSelection));
const TimeSlotSelection = dynamic(() => import('./timeslot-selection').then(m => m.TimeSlotSelection));
const UserDetailsForm = dynamic(() => import('./user-details-form').then(m => m.UserDetailsForm));
const BookingConfirmation = dynamic(() => import('./booking-confirmation').then(m => m.BookingConfirmation));
const BookingComplete = dynamic(() => import('./booking-complete').then(m => m.BookingComplete));

const initialBookingState: Booking = {
  service: null,
  date: null,
  time: null,
  name: '',
  email: '',
  phone: '',
  notes: '',
};

const steps = [
  { id: 1, title: 'Choose a Service', description: 'Select the service you want to book.' },
  { id: 2, title: 'Pick a Time', description: 'Select a date and time that works for you.' },
  { id: 3, title: 'Your Details', description: 'Let us know who you are.' },
  { id: 4, title: 'Confirm Booking', description: 'Review your appointment details.' },
];

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>(initialBookingState);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleServiceSelect = (service: Service) => {
    setBooking({ ...booking, service });
    setStep(2);
  };

  const handleTimeSelect = (date: Date, time: string) => {
    setBooking({ ...booking, date: date.toISOString(), time });
    setStep(3);
  };

  const handleUserDetailsSubmit = (details: { name: string; email: string; phone: string; notes: string }) => {
    setBooking({ ...booking, ...details });
    setStep(4);
  };

  const handleBookingConfirm = async () => {
    if (!booking.service || !booking.date || !booking.time || !booking.phone) return;
    setIsPending(true);

    try {
      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: booking.service.id,
          date: booking.date,
          time: booking.time,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          notes: booking.notes,
        }),
      });

      if (!res.ok) throw new Error('Failed to create booking');

      const result = await res.json();
      console.log('Booking confirmed:', result);
      setStep(5);
    } catch (error) {
       console.error("Booking failed", error);
       toast({
         variant: "destructive",
         title: "Booking Failed",
         description: "We couldn't save your appointment. Please try again.",
       });
    } finally {
        setIsPending(false);
    }
  };

  const handleBack = () => {
    if (step > 1 && !isPending) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setBooking(initialBookingState);
    setStep(1);
  };
  
  const currentStepInfo = steps.find(s => s.id === step);
  const totalSteps = steps.length + 1;

  const motionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl overflow-hidden">
      <CardHeader>
        {step <= steps.length && currentStepInfo && (
          <>
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
            <CardTitle className="font-headline text-2xl">{currentStepInfo.title}</CardTitle>
            <CardDescription>{currentStepInfo.description}</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <ServiceSelection onSelect={handleServiceSelect} />}
            {step === 2 && <TimeSlotSelection onSelect={handleTimeSelect} onBack={handleBack} />}
            {step === 3 && <UserDetailsForm onSubmit={handleUserDetailsSubmit} onBack={handleBack} />}
            {step === 4 && <BookingConfirmation booking={booking} isPending={isPending} onConfirm={handleBookingConfirm} onBack={handleBack} />}
            {step === 5 && <BookingComplete booking={booking} onBookAnother={handleReset} />}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}