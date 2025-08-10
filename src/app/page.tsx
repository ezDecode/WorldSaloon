
import type { Metadata } from 'next';
import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { Testimonials } from '@/components/landing/testimonials';
import { FeedbackForm } from '@/components/landing/feedback-form';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';

export const metadata: Metadata = {
  title: 'Sardar Appointment | Best Barbershop in Kapurthala',
  description: 'Book haircuts, beard trims, and traditional shaves at Sardar Appointment. Easy booking, WhatsApp reminders, and pay in-salon.',
};

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Hero />
        <ServicesList />
        <Testimonials />

        <section id="feedback" className="py-20 md:py-28 bg-secondary/30">
            <div className="w-[80vw] mx-auto px-4 md:px-6">
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

      <SiteFooter />
    </div>
  );
}
