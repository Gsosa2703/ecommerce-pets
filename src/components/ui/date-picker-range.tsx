"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  onSelect,
  ...props
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  // Call the parent's onSelect callback when date changes.
  React.useEffect(() => {
    if (onSelect) {
      onSelect(date)
    }
  }, [date, onSelect])

  const label =
    date?.from ? (
      date.to ? (
        <>
          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
        </>
      ) : (
        format(date.from, "LLL dd, y")
      )
    ) : (
      <span>Pick a date</span>
    )

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn("w-[300px] justify-start text-left", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="text-base"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
