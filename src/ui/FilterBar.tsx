'use client'

import React, { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/date-picker-range"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

type FilterBarProps = {
  onToggleVerified: (checked: boolean) => void
  onSubmitFilterBar: (filters: {
    dateRange: DateRange | null,
    onlyVerified: boolean,
    maxPrice: number,
    starOnly: boolean
  }) => void
}

export function FilterBar({ onToggleVerified, onSubmitFilterBar }: FilterBarProps) {
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [starOnly, setStarOnly] = useState(false)
  const [price, setPrice] = useState([90]) // Default max price
  const [dateRange, setDateRange] = useState<DateRange | null>(null)

  return (
    <aside className="w-full max-w-[350px] p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Verified toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="verified" className="text-lg">Verified Only</Label>
        <Switch
          id="verified"
          checked={onlyVerified}
          onCheckedChange={(val) => {
            setOnlyVerified(val as boolean)
            onToggleVerified(val as boolean)
          }}
        />
      </div>

      {/* Star Woofers */}
      <div className="flex items-center justify-between">
        <Label htmlFor="starred" className="text-lg" >Star Woofers</Label>
        <Checkbox
          id="starred"
          checked={starOnly}
          onCheckedChange={(checked) => setStarOnly(checked as boolean)}
        />
      </div>

      <Separator />

      {/* Price filter */}
      <div className="space-y-2">
        <Label htmlFor="price" className="text-lg">Max Price: ${price[0]}</Label>
        <Slider
          id="price"
          defaultValue={price}
          max={200}
          step={5}
          onValueChange={(val) => setPrice(val)}
        />
      </div>

      <Separator />

      {/* Date range */}
      <div className="space-y-2">
        <Label htmlFor="range" className="text-lg">Availability Range</Label>
        <DatePickerWithRange
          onSelect={(d) => setDateRange(d || null)}
        />
      </div>

      {/* Apply Filters */}
      <div className="pt-4">
        <button
          onClick={() =>
            onSubmitFilterBar({
              dateRange,
              onlyVerified,
              maxPrice: price[0],
              starOnly,
            })
          }
          className="cursor-pointer w-full rounded-lg py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg transition"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  )
}
