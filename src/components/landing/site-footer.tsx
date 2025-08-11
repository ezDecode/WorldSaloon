
import { Button } from "@/components/ui/master";
import { Github, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="w-[80vw] mx-auto px-4 md:px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="font-headline font-bold text-lg">Sardar Appointment</h3>
          <p className="text-muted-foreground mt-2 text-sm">Precision grooming in Kapurthala. Classic techniques, contemporary style.</p>
        </div>
        <div>
          <h4 className="font-semibold">Visit Us</h4>
          <p className="text-sm text-muted-foreground mt-2">Kapurthala, Punjab<br/>Mon–Sat: 10:00–20:00<br/>Sunday: Closed</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm text-muted-foreground mt-2">Phone: +91-00000-00000<br/>Email: hello@sardarappointment.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} Sardar Appointment. All rights reserved.</div>
    </footer>
  );
}
