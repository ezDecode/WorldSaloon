"use client";

import { useState, useMemo, useEffect } from "react";
import { getAvailableTimeSlots } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";

type Props = {
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
};

export function TimeSlotSelection({ onSelect, onBack }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    // Auto-select next available day on mount
    let nextDay = startOfDay(new Date());
    while (getAvailableTimeSlots(nextDay).length === 0) {
      nextDay = addDays(nextDay, 1);
    }
    setDate(nextDay);
  }, []);

  const availableTimes = useMemo(() => (date ? getAvailableTimeSlots(date) : []), [date]);

  const today = startOfDay(new Date());

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(day) => isBefore(day, today) || getAvailableTimeSlots(day).length === 0}
            fromDate={today}
            toDate={addDays(today, 14)}
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {date && (
            <h3 className="font-headline text-lg mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Available slots for {format(date, "EEEE, do MMMM")}
            </h3>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              ))
            ) : (
              <p className="col-span-full text-muted-foreground">No slots available for this day. Please pick another date.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => date && selectedTime && onSelect(date, selectedTime)}
          disabled={!date || !selectedTime}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```