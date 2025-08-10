
import { services } from '@/lib/data';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function ServicesList() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="w-[80vw] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                From classic cuts to modern styling, we offer a range of services to suit your needs.
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="text-center flex flex-col items-center p-6 border-2 border-transparent hover:border-primary/60 hover:shadow-lg transition-all duration-300 bg-secondary/30">
              <div className="mb-4 bg-primary/10 text-primary p-4 rounded-full">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="font-headline text-xl mb-2 font-semibold">{service.name}</h3>
              <div className="flex items-center gap-2 text-xs text-foreground/70 mb-3">
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">{service.duration} mins</span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">₹{service.bookingFee} fee</span>
              </div>
              <p className="text-2xl font-bold mb-4">₹{service.price}</p>
              <a href="/book" className="mt-auto">
                <Button variant="outline" size="sm">Book now</Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
