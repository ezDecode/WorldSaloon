import { BookingFlow } from '@/components/booking/booking-flow';

export default function BookPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
       <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Book Your Slot</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Find a time that works for you. All bookings require a small, non-refundable booking fee to secure your spot.
          </p>
      </div>
      <BookingFlow />
    </div>
  );
}
```