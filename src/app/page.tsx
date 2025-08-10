import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { Testimonials } from '@/components/landing/testimonials';
import { PhulkariPattern } from '@/components/phulkari-pattern';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Twitter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { FeedbackForm } from '@/components/landing/feedback-form';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Sardar Appointment Home">
            <PhulkariPattern className="w-12 h-12" />
            <span className="text-xl md:text-2xl font-bold font-headline text-foreground">
              Sardar Appointment
            </span>
          </Link>
          <nav className="hidden md:flex gap-2 items-center">
            <Button variant="ghost" asChild><a href="#services">Services</a></Button>
            <Button variant="ghost" asChild><a href="#testimonials">Testimonials</a></Button>
            <Button className="bg-primary/90 hover:bg-primary text-primary-foreground" asChild><Link href="/book">Book Now</Link></Button>
          </nav>
           <div className="md:hidden">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[340px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                 <nav className="flex flex-col gap-4 mt-8">
                   <a href="#services" className="text-lg font-medium hover:underline">Services</a>
                   <a href="#testimonials" className="text-lg font-medium hover:underline">Testimonials</a>
                   <Link href="/book" className="text-lg font-medium hover:underline">Book Now</Link>
                 </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <ServicesList />
        <Testimonials />

        <section id="feedback" className="py-16 md:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Leave a Review</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Had a great experience? We'd love to hear from you.
                    </p>
                </div>
                <FeedbackForm />
            </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground border-t border-white/10">
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