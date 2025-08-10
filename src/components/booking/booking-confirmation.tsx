import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Calendar, Clock, User, Mail, IndianRupee, Scissors, Loader2, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

type Props = {
  booking: Booking;
  isPending: boolean;
  onConfirm: () => void;
  onBack: () => void;
};

export function BookingConfirmation({ booking, isPending, onConfirm, onBack }: Props) {
  if (!booking.service || !booking.date || !booking.time) {
    // This should not happen if the flow is correct, but as a fallback:
    return (
        <div className="text-center">
            <p>Something went wrong. Please go back and try again.</p>
            <Button variant="outline" onClick={onBack} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
        </div>
    );
  }

  const { service, date, time, name, email, phone } = booking;
  const totalPayable = service.price + service.bookingFee;

  return (
    <div className="max-w-md mx-auto">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Confirm your Appointment</CardTitle>
          <CardDescription>Please review the details below before confirming.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-muted-foreground" />
            <span>{service.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>{format(parseISO(date), "EEEE, MMMM do, yyyy")}</span>
          </div>
           <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span>{time}</span>
          </div>
           <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <span>{name}</span>
          </div>
           <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span>{email}</span>
          </div>
           <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Price:</span>
                <span>₹{service.price}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booking Fee:</span>
                <span>₹{service.bookingFee}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-base">
                <span className="flex items-center gap-2"><IndianRupee className="w-5 h-5" />Total Payable at Salon:</span>
                <span>₹{totalPayable}</span>
            </div>
          </div>
        </CardContent>
       </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} disabled={isPending}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onConfirm} disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Confirm & Book"}
        </Button>
      </div>
    </div>
  );
}
