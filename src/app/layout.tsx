import type {Metadata} from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sardar Appointment | Barber Shop Booking',
  description: 'Book your next haircut or shave at Sardar Appointment in Kapurthala, Punjab. Easy online booking, pay in-store.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth light", fontSans.variable)}>
      <head />
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
