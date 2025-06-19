 
'use client'

import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from '@/components/ui/date-picker-range'
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dog, Cat } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { differenceInCalendarDays } from "date-fns"
import { CalendarIcon, HomeIcon, ScissorsIcon, SparklesIcon, BoltIcon} from '@heroicons/react/24/outline'

type FilterBarProps = {
  // We no longer require onDateRangeSelect as a prop if we handle it locally,
  // but you can still pass it up if needed.
  onDateRangeSelect?: (dateRange: DateRange | undefined) => void
}

export default function BookForm({ onDateRangeSelect }: FilterBarProps) {
  // Service selection state
  const [serviceText, setServiceText] = useState<string | null>(null)
  const [servicePrice, setServicePrice] = useState<number | null>(null)

  // Pets state
  const [dogs, setDogs] = useState<number>(1)
  const [cats, setCats] = useState<number>(0)

  // Date range state (determines the booking duration)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)

  // Booking summary state
  const [bookingSummary, setBookingSummary] = useState<string | null>(null)

  // Handler for service selection
  const handleClickServiceButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const service = e.currentTarget.value
    if (service === 'grooming') {
      setServicePrice(20)
      setServiceText("Basic grooming session")
    } else if (service === 'sitting') {
      setServicePrice(30)
      setServiceText("Per night (24 hours)")
    } else if (service === 'walking') {
      setServicePrice(15)
      setServiceText("One hour walk")
    }
  }

  // Pets count handlers
  const handleDogsChange = (delta: number) => {
    setDogs(prev => Math.max(prev + delta, 0))
  }
  const handleCatsChange = (delta: number) => {
    setCats(prev => Math.max(prev + delta, 0))
  }

  // When a date range is selected, store it locally (and call parent's callback if provided)
  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)
    if(onDateRangeSelect) {
      onDateRangeSelect(range)
    }
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (servicePrice === null) {
      setBookingSummary("Please select a service first.")
      return
    }

    // Calculate the number of days from selectedRange (if both from & to are available)
    let daysCount = 0
    if (selectedRange && selectedRange.from && selectedRange.to) {
      daysCount =
        differenceInCalendarDays(selectedRange.to, selectedRange.from) + 1
    }

    // Total pets count
    const totalPets = dogs + cats

    // Calculate the total cost: Price per day per pet * number of days
    const totalCost = servicePrice * totalPets * daysCount

    setBookingSummary(
      `For ${daysCount} day(s) with ${totalPets} pet(s) at $${servicePrice} per day, the total cost is $${totalCost}.`
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white flex flex-col p-7 rounded-xl border-1 border-gray-200 gap-3 shadow-lg shadow-gray-300 ">
      <h1 className="text-xl font-semibold">Book A Session</h1>

      {/* Service Selection */}
      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="service" className="pb-1 text-base text-gray-700">
          <BoltIcon className="mr-1 w-6 h-6" aria-hidden="true" />
          Select a Service
          </Label>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" onClick={handleClickServiceButton} value="grooming" type="button">
            <ScissorsIcon className="mr-1" aria-hidden="true" />
            Grooming
          </Button>
          <Button variant="outline" className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" onClick={handleClickServiceButton} value="sitting" type="button">
            <HomeIcon className="mr-1" aria-hidden="true" />
            Pet Sitting
          </Button>
          <Button variant="outline" className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer" onClick={handleClickServiceButton} value="walking" type="button">
            <SparklesIcon className="mr-1" aria-hidden="true" />
               Dog Walking
          </Button>
        </div>
        {serviceText && (
          <div>
               <p className="flex justify-between bg-gray-100 rounded-md py-1 px-3 w-full border-1 border-gray-200">
               <span>{serviceText}</span>
               <span> {servicePrice && `$${servicePrice}`}  </span>
             </p>
             <p className="text-xs text-gray-500">This price is per day and per pet</p>
          </div>

        )}
   
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col w-full max-w-xs gap-2">
        <Label className="pb-1 text-base text-gray-700">            
        <CalendarIcon className="mr-1 w-6 h-6" aria-hidden="true" />
         Date Range</Label>
        <DatePickerWithRange onSelect={handleDateSelect} className=""/>
      </div>

      {/* Pets Picker with Popover */}
      <div className="flex flex-col w-full max-w-xs gap-2">
        <Label htmlFor="pets" className="pb-1 text-base text-gray-700">                  
          <Dog className="mr-1" aria-hidden="true" />
            Pets
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="text-base text-gray-800">Dogs: {dogs} , Cats: {cats}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="flex flex-col gap-4">
              {/* Dogs Row */}
              <div className="flex items-center justify-between">
                <Label className="mr-2">            
                  <Dog className="mr-1" aria-hidden="true" />
                    Dogs
                  </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDogsChange(-1)} disabled={dogs <= 0}>
                    -
                  </Button>
                  <span>{dogs}</span>
                  <Button variant="outline" size="sm" onClick={() => handleDogsChange(1)}>
                    +
                  </Button>
                </div>
              </div>
              {/* Cats Row */}
              <div className="flex items-center justify-between">
                <Label className="mr-2">           <Cat className="mr-1" aria-hidden="true" />
                Cats</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleCatsChange(-1)} disabled={cats <= 0}>
                    -
                  </Button>
                  <span>{cats}</span>
                  <Button variant="outline" size="sm" onClick={() => handleCatsChange(1)}>
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col w-full">
        <Button type="submit" variant="outline" className="button-booking w-full cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg py-5 px-30 font-bold text-lg transition-colors duration-200" >
          Reserve Now
        </Button>
      </div>

      {/* Booking Summary */}
      {bookingSummary && (
        <div className="mt-4 w-full rounded-lg bg-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
          <p className="text-gray-800">{bookingSummary}</p>
        </div>
      )}
    </form>
  )
}
