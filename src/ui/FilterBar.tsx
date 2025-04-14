"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from '@/components/ui/date-picker-range' // Adjust this import based on your date picker component
import { DateRange } from "react-day-picker"
import { Separator } from "@/components/ui/separator"

type FilterBarProps = {
  onSearch: (searchText: string) => void
  onToggleVerified: (checked: boolean) => void
  onDateRangeSelect: (dateRange: DateRange | undefined) => void
}

export function FilterBar({
  onSearch,
  onToggleVerified,
  onDateRangeSelect,
}: FilterBarProps) {
  const [searchText, setSearchText] = useState("")
  const [checked, setChecked] = useState(false)

  return (
   <section className="bg-white rounded-lg md:rounded-full px-6 py-1 self-center"> 
         <div className="flex w-full flex-col gap-4 md:flex-row md:items-center p-4">
           {/* Search Input */}
           <div className="flex flex-col w-full max-w-xs">
             <Label className="pb-2" htmlFor="search">Search</Label>
             <Input
               id="search"
               placeholder="Search Woofers..."
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
             />
           </div>

            <div className="hidden md:block">
              <Separator orientation="vertical" className="h-full" />
            </div>
            
           {/* Verified Switch */}
           <div className="flex items-center gap-2">
             <Label>Only Verified</Label>
             <Switch
               checked={checked}
               onCheckedChange={(val) => {
                 setChecked(val as boolean)
                 onToggleVerified(val as boolean)
               }}
             />
           </div>

           <Separator orientation={'vertical'} />


           {/* Availability Date */}
           <div className="flex flex-col max-w-xs">
             <Label className="pb-2" >Availability Range</Label>
             <DatePickerWithRange onSelect={onDateRangeSelect} />
           </div>
           

           {/* Submit/Apply Filters */}
           <div className="">
             <Button
               onClick={() => {
                 onSearch(searchText)
               }}
               className="w-full bg-orange-400 hover:bg-orange-500 cursor-pointer rounded-full py-5 px-15 font-bold text-lg"
             >
               Search
             </Button>
           </div>
         </div>   
   </section>
   
  )
}
