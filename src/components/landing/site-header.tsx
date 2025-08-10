
'use client';

import Link from "next/link";
import { PhulkariPattern } from "@/components/phulkari-pattern";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
            <div className="w-[80vw] mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-3" aria-label="Sardar Appointment Home">
                    <PhulkariPattern className="w-12 h-12" />
                    <span className="text-xl md:text-2xl font-bold font-headline text-foreground tracking-tight">
                        Sardar Appointment
                    </span>
                </Link>
                <nav className="hidden md:flex gap-2 items-center">
                    <Button variant="ghost" asChild><a href="/#services">Services</a></Button>
                    <Button variant="ghost" asChild><a href="/#testimonials">Testimonials</a></Button>
                    <Button variant="outline" size="sm" className="mr-2">EN</Button>
                    <Link href="/book">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Book Now
                        </Button>
                    </Link>
                </nav>
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] sm:w-[340px]">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-8">
                                <a href="/#services" className="text-lg font-medium hover:underline">Services</a>
                                <a href="/#testimonials" className="text-lg font-medium hover:underline">Testimonials</a>
                                <Link href="/book" className="text-lg font-medium hover:underline">Book Now</Link>
                                <button className="text-left text-sm px-2 py-1 rounded border w-fit">EN</button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
