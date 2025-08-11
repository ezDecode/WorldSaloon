import type { Booking } from "@/types";
import { Button } from "@/components/ui/master";
import { CheckCircle2, Calendar, Clock, IndianRupee } from "lucide-react";
import { format, parseISO } from "date-fns";

type Props = {
  booking: Booking;
  onBookAnother: () => void;
};

export function BookingComplete({ booking, onBookAnother }: Props) {
    if (!booking.service) {
        return (
            <div className="text-center">
                <p>An error occurred. Please book again.</p>
                <Button onClick={onBookAnother} className="mt-4">
                  Book Another Appointment
                </Button>
            </div>
        );
    }
    const totalPayable = booking.service.price + booking.service.bookingFee;

    const whatsAppHref = booking.phone
      ? `https://wa.me/${encodeURIComponent(booking.phone)}?text=${encodeURIComponent(
          `Hi ${booking.name}, your appointment at Sardar Appointment is confirmed for ${booking.date ? format(parseISO(booking.date), "EEEE, d MMMM yyyy") : ''} at ${booking.time}. See you soon!`
        )}`
      : undefined;

  return (
    <div className="text-center flex flex-col items-center max-w-lg mx-auto">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-headline font-bold mb-2">Appointment Booked!</h2>
      <p className="text-muted-foreground mb-6">
        Thank you, {booking.name}! Your booking is confirmed. You will receive an email confirmation shortly.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 text-left w-full space-y-3 mb-8">
        <h3 className="font-bold text-lg">Booking Summary</h3>
        <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary"/>{booking.date ? format(parseISO(booking.date), "EEEE, d MMMM yyyy") : ''} at {booking.time}</p>
        <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary"/>{booking.service.duration} minutes</p>
        <p className="flex items-center font-bold"><IndianRupee className="w-4 h-4 mr-2 text-primary"/>₹{totalPayable} (to be paid at the salon)</p>
      </div>
      {whatsAppHref && booking.whatsappOptIn && (
        <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="mb-4">
          <Button variant="outline">Open WhatsApp confirmation</Button>
        </a>
      )}
      
      <Button onClick={onBookAnother}>
        Book Another Appointment
      </Button>
    </div>
  );
}