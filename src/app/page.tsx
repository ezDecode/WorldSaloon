
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { ClientToaster } from '@/components/client-toaster';

// Dynamic imports for better performance
const Testimonials = dynamic(
  () => import('@/components/landing/testimonials').then(m => ({ default: m.Testimonials })),
  {
    loading: () => (
      <div className="py-20 md:py-28 bg-secondary/20">
        <div className="w-[90vw] max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded-md w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const FeedbackForm = dynamic(
  () => import('@/components/landing/feedback-form').then(m => ({ default: m.FeedbackForm })),
  {
    loading: () => (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse w-32 ml-auto" />
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

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
        
        <Testimonials />

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
            <FeedbackForm />
          </div>
        </section>
      </main>

      <SiteFooter />
      <ClientToaster />
    </div>
  );
}
