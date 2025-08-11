import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const headlineFont = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-headline',
  display: 'swap',
  preload: false,
});

const bodyFont = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sardar-appointment.web.app'),
  title: {
    default: 'Sardar Appointment | Best Barbershop in Kapurthala, Punjab',
    template: '%s | Sardar Appointment'
  },
  description: 'Premium barbershop services in Kapurthala, Punjab. Book haircuts, beard trims, and traditional shaves online. Expert barbers, modern techniques, and traditional hospitality.',
  keywords: ['barbershop', 'haircut', 'beard trim', 'shave', 'Kapurthala', 'Punjab', 'barber', 'grooming', 'men\'s haircut'],
  authors: [{ name: 'Sardar Appointment' }],
  creator: 'Sardar Appointment',
  publisher: 'Sardar Appointment',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sardar-appointment.web.app',
    siteName: 'Sardar Appointment',
    title: 'Best Barbershop in Kapurthala | Sardar Appointment',
    description: 'Premium barbershop services in Kapurthala, Punjab. Book online for haircuts, beard trims, and traditional shaves.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sardar Appointment Barbershop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Barbershop in Kapurthala | Sardar Appointment',
    description: 'Premium barbershop services in Kapurthala, Punjab. Book online for haircuts, beard trims, and traditional shaves.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://sardar-appointment.web.app',
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", headlineFont.variable, bodyFont.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FF9933" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-body antialiased">
        <div id="root">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
