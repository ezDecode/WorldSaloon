import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://placehold.co/1200x800.png" 
          alt="Modern barbershop interior" 
          fill
          style={{objectFit: 'cover'}}
          data-ai-hint="barbershop interior dark"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold leading-tight">
            Style, Precision &<br /> a Touch of Tradition.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-prose mx-auto">
            Experience the finest grooming services in Kapurthala. We combine modern techniques with timeless style to give you the perfect look.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold" asChild>
              <a href="#booking">Book an Appointment</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
