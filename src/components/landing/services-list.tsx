
"use client";

import { services } from '@/lib/data';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function ServicesList() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="w-[90vw] max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Our Premium Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From classic cuts to modern styling, we offer a comprehensive range of grooming services tailored to your preferences.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="group text-center flex flex-col items-center p-6 border-2 border-transparent hover:border-primary/60 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm h-full">
                <motion.div 
                  className="mb-4 bg-primary/10 text-primary p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <service.icon className="w-8 h-8" />
                </motion.div>

                <h3 className="font-headline text-xl mb-3 font-semibold group-hover:text-primary transition-colors duration-300">
                  {service.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-foreground/70 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {service.duration} mins
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    ₹{service.bookingFee} fee
                  </span>
                </div>

                <div className="text-3xl font-bold mb-6 text-primary">
                  ₹{service.price}
                </div>

                <div className="mt-auto w-full">
                  <Link href="/book" className="block w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            All services include complimentary consultation and styling advice
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              Book Multiple Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
