
'use client'

import * as React from 'react'
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { PencilSquareIcon, StarIcon } from '@heroicons/react/24/outline'

type SortKey = 'rating' | 'reviews'
type SortOrder = 'asc' | 'desc'
type SortingOption = `${SortKey}-${SortOrder}`

interface SortingBarProps {
  onChange: (sortKey: SortKey, sortOrder: SortOrder) => void
  defaultValue?: SortingOption
  className?: string
}

export default function SortingBar({
  onChange,
  defaultValue = 'rating-desc',
  className,
}: SortingBarProps) {
  const [selected, setSelected] = React.useState<SortingOption>(defaultValue)

  const handleChange = (value: SortingOption) => {
    setSelected(value)
    const [key, order] = value.split('-')
    onChange(key as SortKey, order as SortOrder)
  }

  return (
    <div className={cn("w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 text-light", className)}>
      <RadioGroup
        defaultValue={defaultValue}
        value={selected}
        onValueChange={handleChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rating-desc" id="rating-desc" />
          <Label htmlFor="rating-desc"> 
          <StarIcon className="h-6 w-6 text-orange-400 fill-orange-400" aria-hidden="true" />
           Rating: High to Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rating-asc" id="rating-asc" />
          <Label htmlFor="rating-asc"> 
          <StarIcon className="h-6 w-6 text-orange-400 fill-orange-400" aria-hidden="true" />
           Rating: Low to High</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="reviews-desc" id="reviews-desc" />
          <Label htmlFor="reviews-desc"> 
          <PencilSquareIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
           Reviews: Most to Least</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="reviews-asc" id="reviews-asc" />
          <Label htmlFor="reviews-asc"> 
          <PencilSquareIcon className="h-6 w-6 text-orange-400" aria-hidden="true" />
          Reviews: Least to Most</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
