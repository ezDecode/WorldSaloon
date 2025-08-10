
import { Button } from "@/components/ui/button";
import { Github, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="bg-secondary text-secondary-foreground border-t">
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
    );
}
