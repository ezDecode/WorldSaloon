"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/types";
import { app } from "@/lib/firebase"; 
import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";


export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const db = getFirestore(app);
        const testimonialsCol = collection(db, "testimonials");
        const q = query(testimonialsCol, orderBy("createdAt", "desc"));
        const testimonialSnapshot = await getDocs(q);
        const testimonialList = testimonialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        setTestimonials(testimonialList);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
            <p className="text-muted-foreground mt-2">
                We take pride in our work, and our clients agree!
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && Array.from({ length: 3 }).map((_, i) => (
             <Card key={i} className="bg-background border p-6 shadow-lg">
               <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-14 h-14 rounded-full mr-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
               </CardContent>
             </Card>
          ))}
          {!loading && testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background border p-6 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 relative border-2 border-primary">
                    <Image 
                      src={testimonial.avatarUrl || "https://placehold.co/100x100.png"} 
                      alt={`Avatar of ${testimonial.name}`} 
                      fill
                      style={{objectFit: 'cover'}}
                      data-ai-hint="portrait person"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <div className="flex text-primary">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```