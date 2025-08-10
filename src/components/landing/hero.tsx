import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                    Style, Precision &<br /> a Touch of Tradition.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-prose">
                    Experience the finest grooming services in Kapurthala. We combine modern techniques with timeless style to give you the perfect look.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <Button size="lg" asChild>
                        <a href="#booking">Book an Appointment</a>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                        <a href="#services">
                            Our Services <ArrowDown className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
                 <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Modern barbershop interior" 
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint="barbershop interior"
                    className="transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>
        </div>
    </section>
  )
}
