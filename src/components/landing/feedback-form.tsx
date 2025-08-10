"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createTestimonial } from "@/ai/flows/create-testimonial-flow";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  quote: z.string().min(10, { message: "Feedback must be at least 10 characters." }),
});

export function FeedbackForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      quote: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsPending(true);
    try {
      await createTestimonial(data);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your review! It will appear on the site shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to submit feedback", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "We couldn't save your feedback. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. Rohan S." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quote"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Tell us about your experience..." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex justify-end mt-6">
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : "Submit Feedback"}
                </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}