import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, User, Phone, IndianRupee, Scissors } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

type Props = {
  booking: Booking;
  onConfirm: () => void;
  onBack: () => void;
};

export function BookingConfirmation({ booking, onConfirm, onBack }: Props) {
  if (!booking.service || !booking.date || !booking.time) {
    return <div>Something went wrong. Please start over.</div>;
  }

  const { service, date, time, name, phone } = booking;

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
            <span>{format(date, "EEEE, MMMM do, yyyy")}</span>
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
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3 font-bold">
            <IndianRupee className="w-5 h-5 text-muted-foreground" />
            <span>{service.price} (Pay at Salon)</span>
          </div>
        </CardContent>
       </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onConfirm}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
