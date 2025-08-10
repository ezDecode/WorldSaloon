
import { Metadata } from 'next';
import { ClientToaster } from '@/components/client-toaster';
import { BookingFlow } from '@/components/booking/booking-flow';

export const metadata: Metadata = {
  title: 'Book Appointment | Sardar Appointment',
  description: 'Schedule your haircut, beard trim, or shave appointment at Sardar Appointment. Easy online booking with instant confirmation.',
  openGraph: {
    title: 'Book Your Appointment | Sardar Appointment',
    description: 'Schedule your appointment at the best barbershop in Kapurthala. Easy online booking with instant confirmation.',
    url: 'https://sardar-appointment.web.app/book',
  },
  alternates: {
    canonical: 'https://sardar-appointment.web.app/book',
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-width py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Book Your Appointment
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Choose your preferred service, select a convenient time slot, and secure your booking. 
            All appointments include expert consultation and are payable in-salon.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <BookingFlow />
        </div>
        
        <ClientToaster />
      </div>
    </div>
  );
}
