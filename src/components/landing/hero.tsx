
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative bg-background text-foreground py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://placehold.co/1600x1000.png"
          alt="Modern barbershop interior"
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint="barbershop interior warm light"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <motion.div
        className="w-[80vw] mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl text-center mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold leading-tight"
            variants={itemVariants}
          >
            Precision Cuts. Warm Hospitality.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-prose mx-auto"
            variants={itemVariants}
          >
            Classic or contemporary, we craft looks that suit you. Book in minutes and pay in-store.
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/book">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                    Book an Appointment
                </Button>
            </Link>
            <a href="/#services">
              <Button size="lg" variant="outline">View Services</Button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
