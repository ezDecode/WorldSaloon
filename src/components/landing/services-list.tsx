import { services } from '@/lib/data';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ServicesList() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                From classic cuts to modern styling, we offer a range of services to suit your needs.
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="text-center flex flex-col items-center p-6 border-2 hover:border-primary transition-colors duration-300">
              <div className="mb-4 bg-primary/10 text-primary p-4 rounded-full">
                <service.icon className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-xl mb-2">{service.name}</CardTitle>
              <p className="text-muted-foreground text-sm mb-4">{service.duration} mins</p>
              <p className="text-2xl font-bold mb-4">₹{service.price}</p>
              <p className="text-xs text-muted-foreground">+ ₹{service.bookingFee} booking fee</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
