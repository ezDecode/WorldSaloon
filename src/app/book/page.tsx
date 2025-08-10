
import { BookingFlow } from '@/components/booking/booking-flow';

export default function BookPage() {
  return (
    <div className="w-[80vw] mx-auto px-4 md:px-6 py-16 md:py-24">
       <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Book Your Slot</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Find a time that works for you. All bookings include a small booking fee to secure your spot and are payable in-salon.
          </p>
      </div>
      <BookingFlow />
    </div>
  );
}
