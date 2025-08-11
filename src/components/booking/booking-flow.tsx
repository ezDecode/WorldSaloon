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
  whatsappOptIn: true,
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

  const handleUserDetailsSubmit = (details: { name: string; email: string; phone: string; notes?: string; whatsappOptIn?: boolean }) => {
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
          whatsappOptIn: booking.whatsappOptIn,
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceSelection onSelect={handleServiceSelect} />;
      case 2:
        return <TimeSlotSelection onSelect={handleTimeSelect} onBack={handleBack} />;
      case 3:
        return <UserDetailsForm onSubmit={handleUserDetailsSubmit} onBack={handleBack} />;
      case 4:
        return <BookingConfirmation booking={booking} onConfirm={handleBookingConfirm} onBack={handleBack} isPending={isPending} />;
      case 5:
        return <BookingComplete booking={booking} onBookAnother={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <ProgressBar currentStep={step} totalSteps={4} />
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl md:text-3xl font-headline">
            {steps[step - 1]?.title}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {steps[step - 1]?.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}