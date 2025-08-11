
import { PhulkariPattern } from "@/components/phulkari-pattern";
import { Button } from "@/components/ui/master";
import { SiteFooter } from "@/components/landing/site-footer";
import Link from 'next/link';

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="w-[80vw] mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Sardar Appointment Home">
            <PhulkariPattern className="w-12 h-12" />
            <span className="text-xl md:text-2xl font-bold font-headline text-foreground tracking-tight">
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

      <SiteFooter />
    </div>
  )
}
