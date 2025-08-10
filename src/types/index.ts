import type { LucideIcon } from "lucide-react";

export type Service = {
  id: number;
  name: string;
  duration: number;
  price: number;
  icon: LucideIcon;
};

export type Booking = {
  service: Service | null;
  date: string | null; // Changed from Date to string for serialization
  time: string | null;
  name: string;
  phone: string;
  notes: string;
};
