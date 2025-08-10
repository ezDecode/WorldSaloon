"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

type Props = {
  onSubmit: (details: { name: string; phone: string; notes: string }) => void;
  onBack: () => void;
};

export function UserDetailsForm({ onSubmit, onBack }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) {
      setError("Please fill in your name and phone number.");
      return;
    }
    // Basic phone validation
    if (!/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''))) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    onSubmit({ name, phone, notes });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Gurpreet Singh" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="For WhatsApp notifications" />
        </div>
        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests?" />
        </div>
      </div>
      {error && <p className="text-sm text-destructive mt-4">{error}</p>}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
}
