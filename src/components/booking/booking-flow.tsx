"use client";

import { useState } from 'react';
import type { Booking, Service } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProgressBar } from './progress-bar';
import { ServiceSelection } from './service-selection';
import { TimeSlotSelection } from './timeslot-selection';
import { UserDetailsForm } from './user-details-form';
import { BookingConfirmation } from './booking-confirmation';
import { BookingComplete } from './booking-complete';

const initialBookingState: Booking = {
  service: null,
  date: null,
  time: null,
  name: '',
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
  const { toast } = useToast();

  const handleServiceSelect = (service: Service) => {
    setBooking({ ...booking, service });
    setStep(2);
  };

  const handleTimeSelect = (date: Date, time: string) => {
    setBooking({ ...booking, date, time });
    setStep(3);
  };

  const handleUserDetailsSubmit = (details: { name: string; phone: string; notes: string }) => {
    setBooking({ ...booking, ...details });
    setStep(4);
  };

  const handleBookingConfirm = () => {
    // In a real app, this would be a server action
    console.log('Booking confirmed:', booking);
    toast({
      title: "Booking Confirmed!",
      description: "Your appointment has been successfully scheduled.",
    });
    setStep(5);
  };

  const handleBack = () => {
    if (step > 1) {
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
            {step === 4 && <BookingConfirmation booking={booking} onConfirm={handleBookingConfirm} onBack={handleBack} />}
            {step === 5 && <BookingComplete booking={booking} onBookAnother={handleReset} />}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
