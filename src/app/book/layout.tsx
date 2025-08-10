import { PhulkariPattern } from "@/components/phulkari-pattern";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Twitter } from "lucide-react";
import Link from 'next/link';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Sardar Appointment Home">
            <PhulkariPattern className="w-12 h-12" />
            <span className="text-xl md:text-2xl font-bold font-headline text-foreground">
              Sardar Appointment
            </span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-secondary text-secondary-foreground border-t border-white/10">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-headline font-bold">Sardar Appointment</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Kapurthala, Punjab, India
            </p>
             <p className="text-sm text-muted-foreground mt-1">
              © {new Date().getFullYear()} Sardar Appointment. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram"><Instagram /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Github"><Github /></a>
              </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
