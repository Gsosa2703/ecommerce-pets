'use client'

import * as React from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SortKey = 'rating' | 'reviews' | 'price'
type SortOrder = 'asc' | 'desc'

interface SortingBarProps {
  onChange: (sortKey: SortKey, sortOrder: SortOrder) => void
  defaultSortKey?: SortKey
  defaultSortOrder?: SortOrder
  className?: string
}

export default function SortingBar({
  onChange,
  defaultSortKey = 'rating',
  defaultSortOrder = 'desc',
  className,
}: SortingBarProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>(defaultSortKey)
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(defaultSortOrder)

  const handleOptionClick = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle sort order if the same option is clicked.
      const newOrder: SortOrder = sortOrder === 'desc' ? 'asc' : 'desc'
      setSortOrder(newOrder)
      onChange(key, newOrder)
    } else {
      // Switch sort key and reset to default order (here "desc")
      setSortKey(key)
      setSortOrder('desc')
      onChange(key, 'desc')
    }
  }

  return (
    <div className={cn("flex items-center justify-end gap-4 px-4 py-2", className)}>
      <span className="text-sm text-gray-600">Sort by:</span>

      <Button
        variant="ghost"
        onClick={() => handleOptionClick('rating')}
        className={cn(
          "flex items-center gap-1",
          sortKey === 'rating' && "border-2 border-orange-400"
        )}
      >
        <span>Rating</span>
        {sortKey === 'rating' &&
          (sortOrder === 'asc' ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          ))}
      </Button>

      <Button
        variant="ghost"
        onClick={() => handleOptionClick('reviews')}
        className={cn(
          "flex items-center gap-1",
          sortKey === 'reviews' && "border-2 border-orange-400"
        )}
      >
        <span>Reviews</span>
        {sortKey === 'reviews' &&
          (sortOrder === 'asc' ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          ))}
      </Button>

      <Button
        variant="ghost"
        onClick={() => handleOptionClick('price')}
        className={cn(
          "flex items-center gap-1",
          sortKey === 'price' && "border-2 border-orange-400"
        )}
      >
        <span>Price</span>
        {sortKey === 'price' &&
          (sortOrder === 'asc' ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          ))}
      </Button>
    </div>
  )
}
