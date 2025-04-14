 

'use client'

import { StarIcon } from '@heroicons/react/24/outline'
import { Badge } from "@/components/ui/badge"
import {services} from '@/lib/servicePage'

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination" // adjust this path
import React from 'react'
import { FilterBar } from "@/ui/FilterBar"
import { DateRange } from 'react-day-picker'
import SortingBar from '@/ui/SortingBar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 9

export default function Service({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = React.use(params)

  const slugModified = slug.replace(/-/g, '').toLowerCase()

  const service = services[slugModified] ?? []

  
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(service.woofers.length / ITEMS_PER_PAGE)

  const paginatedWoofers = service.woofers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const [filteredWoofers, setFilteredWoofers] = useState(paginatedWoofers)

  function handleSearch(searchText: string) {
    // Filter logic: name or bio includes searchText
    // setFilteredWoofers(...)

    console.log(searchText)
    console.log(filteredWoofers)
    setFilteredWoofers([])
  }
  function handleToggleVerified(checked: boolean) {
    // Filter only verified woofers
    // setFilteredWoofers(...)
    console.log(checked)
  }
  function handleDateChange(date?: DateRange | undefined) {
    // Filter by availability
    console.log(date)
  }

  const [sortKey, setSortKey] = useState<'rating' | 'reviews'>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  console.log(sortOrder, sortKey)

  return (
    <section className="w-full overflow-x-hidden">
                  
        <div style={{backgroundPosition: "center bottom", backgroundImage: `url(${service.banner})`}} 
            className="w-full px-10 pt-5 items-center md:px-30 md:pt-15 bg-cover bg-no-repeat relative flex flex-col h-[auto] md:h-[400px] lg:h-[300px] xl:h-[500px]">

          <div>
            <h1 className='text-white text-3xl md:text-5xl font-bold mb-4'>{service.title}</h1>
            <h3 className='text-white text-medium md:text-xl font-medium mb-5'>{service.subtitle}</h3>
          </div>
          
          <FilterBar
            onSearch={handleSearch}
            onToggleVerified={handleToggleVerified}
            onDateRangeSelect={handleDateChange}
          />
          <span className='md:text-white md:pl-6 text-medium'>**All these Woofers are filtered by your current location</span>

      </div>

      <div className='md:px-24 pt-10 w-full flex justify-end xl:pr-40'>
        <Popover>
          <PopoverTrigger className="cursor-pointer border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-100 transition duration-200 ease-in-out">
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
          </PopoverTrigger>

            <PopoverContent>
            <SortingBar
              defaultValue="rating-desc"
              onChange={(key, order) => {
                setSortKey(key)
                setSortOrder(order)
              }}
            />
            </PopoverContent>
          </Popover>
      </div>
  
      <div className='flex flex-col items-center justify-center md:px-24 md:py-15'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedWoofers.map((woofer, index) => (
                          <div
                            key={index}
                            className="flex flex-col m-2 px-5 xl:px-10
                            bg-cover bg-center bg-no-repeat relative rounded-xl max-w-[441px]"  style={{
                              backgroundImage: `url(${woofer.profilePic})`,
                            }}
                          >
                            
                            <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
    
                            <div className="flex flex-col text-white relative z-10 overflow-hidden rounded-regular h-[640px]">
                                  <div className='flex h-full w-full flex-col justify-end mb-10'>
                                    <div className='flex flex-col gap-y-4'>
                                      <span className="text-3xl font-medium">{woofer.name}</span>
                                      <div className="flex flex-wrap gap-2">
                                          {woofer.tags.map((tag, index) => {
                                          const icon = index === 1 ? '⭐' : index === 2 ? '🐾' : index === 3 ? '💖' : '💖'
                                          return <Badge key={tag} variant="outline" className="bg-white text-md">{icon} {tag}</Badge>
                                          } )}
                                      </div>
                                      <div className="w-full flex items-center justify-between flex-wrap">
                                          <div className="flex items-center gap-2">
                                            <StarIcon className="h-6 w-6 text-white fill-white" aria-hidden="true" />
                                            <span className="text-lg font-medium">{woofer.starRating}</span>
                                          </div>
                                          <span className="text-lg underline">Read Reviews ({woofer.numberOfReviews})</span>
                                      </div>
                                    </div>
                                  </div>
                            </div>
                          </div>
          ))}

        </div>
      </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                href="#"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
 
    </section>
  )
}