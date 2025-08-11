"use client";

import dynamic from "next/dynamic";

export const TestimonialsClient = dynamic(
  () => import("@/components/landing/testimonials").then((m) => ({ default: m.Testimonials })),
  {
    ssr: false,
  }
);

export const FeedbackFormClient = dynamic(
  () => import("@/components/landing/feedback-form").then((m) => ({ default: m.FeedbackForm })),
  {
    ssr: false,
  }
);


