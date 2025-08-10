import { BookingFlow } from '@/components/booking/booking-flow';
import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { Testimonials } from '@/components/landing/testimonials';
import { PhulkariPattern } from '@/components/phulkari-pattern';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Twitter } from 'lucide-react';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <a href="/" className="flex items-center gap-3" aria-label="Sardar Appointment Home">
            <PhulkariPattern className="w-12 h-12" />
            <span className="text-2xl md:text-3xl font-bold font-headline text-foreground">
              Sardar Appointment
            </span>
          </a>
          <nav className="hidden md:flex gap-2 items-center">
            <Button variant="ghost" asChild><a href="#services">Services</a></Button>
            <Button variant="ghost" asChild><a href="#testimonials">Testimonials</a></Button>
            <Button asChild><a href="#booking">Book Now</a></Button>
          </nav>
           <div className="md:hidden">
            <Button asChild size="sm">
              <a href="#booking">Book Now</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <ServicesList />
        <Testimonials />

        <section id="booking" className="py-16 md:py-24 bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Book Your Slot</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Find a time that works for you. All bookings require a small, non-refundable booking fee to secure your spot.
                    </p>
                </div>
                <BookingFlow />
            </div>
        </section>
      </main>

      <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-headline font-bold">Sardar Appointment</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Kapurthala, Punjab, India
            </p>
             <p className="text-sm text-muted-foreground mt-1">
              © {new Date().getFullYear()} Sardar Appointment. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Github"><Github /></a>
              </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
