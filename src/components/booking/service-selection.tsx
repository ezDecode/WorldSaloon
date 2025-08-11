import { services } from "@/lib/data";
import type { Service } from "@/types";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/master";
import { Clock, IndianRupee, Plus } from "lucide-react";

type Props = {
  onSelect: (service: Service) => void;
};

export function ServiceSelection({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 bg-background hover:border-primary">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">{service.name}</CardTitle>
                <CardDescription className="mt-2 flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{service.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span>{service.price}</span>
                    <Plus className="w-3 h-3 text-muted-foreground" />
                    <span className="font-semibold">₹{service.bookingFee} Booking Fee</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => onSelect(service)} className="w-full">
              Select
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}