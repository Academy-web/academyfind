"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-amber-100
        bg-white
        p-8
        shadow-sm
      "
    >
      <h2 className="text-2xl font-bold">
        Send a Message
      </h2>

      <div className="mt-8 space-y-5">
        <Input placeholder="Your Name" />

        <Input
          type="email"
          placeholder="Your Email"
        />

        <Input placeholder="Subject" />

        <Textarea
          placeholder="Your Message"
          className="min-h-45"
        />

        <Button
          className="
            h-12
            bg-amber-500
            hover:bg-amber-600
          "
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}