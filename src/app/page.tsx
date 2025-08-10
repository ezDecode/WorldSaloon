
import dynamic from 'next/dynamic';
import { Hero } from '@/components/landing/hero';
import { ServicesList } from '@/components/landing/services-list';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { ClientToaster } from '@/components/client-toaster';

const Testimonials = dynamic(() => import('@/components/landing/testimonials').then(m => m.Testimonials), {
  loading: () => null,
});

const FeedbackForm = dynamic(() => import('@/components/landing/feedback-form').then(m => m.FeedbackForm), {
  loading: () => null,
});

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-grow">
        <Hero />
        <ServicesList />
        <Testimonials />

        <section id="feedback" className="py-16 md:py-24 bg-secondary/30">
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
      <ClientToaster />
    </div>
  );
}
