import { BookingFlow } from '@/components/booking/booking-flow';
import { LanguageSwitcher } from '@/components/language-switcher';
import { PhulkariPattern } from '@/components/phulkari-pattern';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  const shopPhoneNumber = '+910000000000'; // Replace with actual phone number

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <a href="/" aria-label="Sardar Appointment Home">
              <PhulkariPattern className="w-12 h-12" />
            </a>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
              Sardar Appointment
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="booking" className="flex-grow container mx-auto py-8 md:py-16 px-4 md:px-6">
        <BookingFlow />
      </main>

      <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sardar Appointment. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Kapurthala, Punjab, India
          </p>
        </div>
      </footer>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button asChild className="flex-1" size="lg">
          <a href="#booking">Book Now</a>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <a href={`tel:${shopPhoneNumber}`} aria-label="Call the shop">
            <Phone className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}
