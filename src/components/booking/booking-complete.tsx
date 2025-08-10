import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, IndianRupee } from "lucide-react";
import { format } from "date-fns";

type Props = {
  booking: Booking;
  onBookAnother: () => void;
};

export function BookingComplete({ booking, onBookAnother }: Props) {
  return (
    <div className="text-center flex flex-col items-center max-w-lg mx-auto">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-headline font-bold mb-2">Appointment Booked!</h2>
      <p className="text-muted-foreground mb-6">
        Thank you, {booking.name}! Your booking is confirmed. You will receive a WhatsApp message shortly.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 text-left w-full space-y-3 mb-8">
        <h3 className="font-bold text-lg">Booking Summary</h3>
        <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary"/>{booking.date ? format(booking.date, "EEEE, d MMMM yyyy") : ''} at {booking.time}</p>
        <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary"/>{booking.service?.duration} minutes</p>
        <p className="flex items-center"><IndianRupee className="w-4 h-4 mr-2 text-primary"/>{booking.service?.price} (to be paid at the salon)</p>
      </div>
      
      <Button onClick={onBookAnother}>
        Book Another Appointment
      </Button>
    </div>
  );
}
