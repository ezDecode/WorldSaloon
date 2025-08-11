
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamic imports for better code splitting
const Hero = dynamic(() => import('@/components/landing/hero').then(m => ({ default: m.Hero })), {
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />
});

const ServicesList = dynamic(() => import('@/components/landing/services-list').then(m => ({ default: m.ServicesList })), {
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />
});

const SiteHeader = dynamic(() => import('@/components/landing/site-header').then(m => ({ default: m.SiteHeader })), {
  loading: () => <div className="h-16 bg-muted animate-pulse rounded-lg" />
});

const SiteFooter = dynamic(() => import('@/components/landing/site-footer').then(m => ({ default: m.SiteFooter })), {
  loading: () => <div className="h-32 bg-muted animate-pulse rounded-lg" />
});

const ClientToaster = dynamic(() => import('@/components/client-toaster').then(m => ({ default: m.ClientToaster })));
const TestimonialsClient = dynamic(() => import('@/components/client-dynamic').then(m => ({ default: m.TestimonialsClient })));
const FeedbackFormClient = dynamic(() => import('@/components/client-dynamic').then(m => ({ default: m.FeedbackFormClient })));

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
