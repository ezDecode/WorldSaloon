
import type { Metadata } from 'next';
import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { ClientToaster } from '@/components/client-toaster';
import { TestimonialsClient, FeedbackFormClient } from '@/components/client-dynamic';

export const metadata: Metadata = {
  title: 'Best Barbershop in Kapurthala | Expert Grooming Services',
  description: 'Premium barbershop services in Kapurthala, Punjab. Book haircuts, beard trims, and traditional shaves online. Expert barbers, modern techniques, and traditional hospitality.',
  openGraph: {
    title: 'Best Barbershop in Kapurthala | Expert Grooming Services',
    description: 'Premium barbershop services in Kapurthala, Punjab. Book haircuts, beard trims, and traditional shaves online.',
    url: 'https://sardar-appointment.web.app',
    type: 'website',
  },
  alternates: {
    canonical: 'https://sardar-appointment.web.app',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Hero />
        
        <ServicesList />
        
        <TestimonialsClient />

        <section id="feedback" className="py-20 md:py-28 bg-secondary/30">
          <div className="w-[90vw] max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                Share Your Experience
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Had a great experience? We'd love to hear from you and share your story with others.
              </p>
            </div>
            <FeedbackFormClient />
          </div>
        </section>
      </main>

      <SiteFooter />
      <ClientToaster />
    </div>
  );
}
