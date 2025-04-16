 

'use client'

import { StarIcon } from '@heroicons/react/24/outline'
import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
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

import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { IWoofer } from '@/lib/woofers'
import {ServiceType, ServicesMap} from '@/lib/servicePage'
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from '@/components/ui/separator'

const ITEMS_PER_PAGE = 9

export default function Service({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = React.use(params)

  const slugModified = slug.replace(/-/g, '').toLowerCase()

  const [services, setServices] = useState<ServicesMap>({})

  useEffect(() => {
    // This code runs only on the client
    const value = window.localStorage.getItem("services")
    setServices(JSON.parse(value ||''))
  }, [])

  const service: ServiceType = services[slugModified] || {}

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  let totalPages = 0
  let paginatedWoofers: IWoofer[] = []
  if(service.woofers) {
    totalPages = Math.ceil(service.woofers.length / ITEMS_PER_PAGE)
    paginatedWoofers = service.woofers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )
  
  }

  console.log(paginatedWoofers)
  
  // Filtering state for woofer list
  const [filteredWoofers, setFilteredWoofers] = useState<IWoofer[]>(paginatedWoofers) 

    // Synchronize filteredWoofers with paginatedWoofers when service.woofers or currentPage changes
    useEffect(() => {
      setFilteredWoofers(paginatedWoofers)
    }, [service.woofers, currentPage])
  

    // --- Search filter: filters by name, tags, or badges.
    function handleSearchAndDate(searchText: string, date: DateRange | null) {
      const lowerText = searchText.toLowerCase();
      
      // Filter by name, tags, or badges
      const result = service.woofers.filter(woofer =>
        woofer.name.toLowerCase().includes(lowerText) ||
        (woofer.tags && woofer.tags.some(tag => tag.toLowerCase().includes(lowerText))) ||
        (woofer.badges && woofer.badges.some(badge => badge.toLowerCase().includes(lowerText)))
      );
      
      // If a valid date range is provided, filter further (in this mock example, we filter even-indexed items)
      const finalResult = (date && date.from && date.to)
        ? result.filter((_, index) => index % 2 === 0)
        : result;
      
      setFilteredWoofers(finalResult);
    }
   // --- Verified toggle: filter woofer where isVerified === true
   function handleToggleVerified(checked: boolean) {
    const base = service.woofers
    const result = checked ? base.filter(woofer => woofer.isVerified) : base
    setFilteredWoofers(result)
  }


  const [sortKey, setSortKey] = useState<'rating' | 'reviews' | 'price'>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleSortChange = (key: 'rating' | 'reviews' | 'price', order: 'asc' | 'desc') => {
    setSortKey(key)
    setSortOrder(order)
    // Apply your sorting logic to update the displayed woofer list
    console.log("Sorting by", key, order)
    console.log("Sorting by", sortKey, sortOrder)

  }

   // We animate the woofer list using Framer Motion for smooth transitions.
    // Define a fade variant for the cards.
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    }

  if (!service.woofers?.length) {
    return <p>Loading services...</p>;
  }

  console.log(filteredWoofers, 'filtering')
  console.log(filteredWoofers, 'filtering')

  return (
    <section className="w-full overflow-x-hidden">
      {/* Banner / Header */}
      <div
        style={{ backgroundPosition: "center bottom", backgroundImage: `url(${service.banner})` }}
        className="w-full px-10 pt-5 items-center md:px-30 md:pt-15 bg-cover bg-no-repeat relative flex flex-col h-auto md:h-[400px] lg:h-[300px] xl:h-[500px]"
      >
        <div>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <h3 className="text-white text-medium md:text-xl font-medium mb-5">{service.subtitle}</h3>
        </div>
        <FilterBar
          onSubmitFilterBar={handleSearchAndDate}
          onToggleVerified={handleToggleVerified}
        />
        <span className="md:text-white md:pl-6 text-medium">
          **All these Woofers are filtered by your current location
        </span>
      </div>

    <div className='px-10 pt-10'>

      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-medium'>{service.woofers.length} Woofers Available</h2>
        <SortingBar onChange={handleSortChange} />
      </div>


      {/* Render your sorted list here */}
      <Separator />
    </div>

      {/* Woofer Grid with Animated Transitions */}
      <div className="flex flex-col items-center justify-center md:px-24 md:py-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredWoofers.map((woofer) => (
              <Link key={woofer.uid} href={`/woofers/${woofer.uid}`}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col m-2 px-5 xl:px-10 bg-cover bg-center bg-no-repeat relative rounded-xl max-w-[421px] cursor-pointer"
                  style={{ backgroundImage: `url(${woofer.profilePic})` }}
                >
                  {woofer.isVerified && (
                    <ShieldCheckIcon className="absolute top-0 right-0 w-10 h-10 text-orange-400 z-10" />
                  )}
                  <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
                  <div className="flex flex-col text-white relative z-10 overflow-hidden rounded-regular h-[640px]">
                    <div className="flex h-full w-full flex-col justify-end mb-10">
                      <div className="flex flex-col gap-y-4">
                        <span className="text-3xl font-medium">{woofer.name}</span>
                        <div className="flex flex-wrap gap-2">
                          {woofer.tags.map((tag, index) => {
                            const icon = index === 1
                              ? '⭐'
                              : index === 2
                              ? '🐾'
                              : index === 3
                              ? '💖'
                              : '💖'
                            return (
                              <Badge key={tag} variant="outline" className="bg-white text-md">
                                {icon} {tag}
                              </Badge>
                            )
                          })}
                        </div>
                        <div className="w-full flex items-center justify-between flex-wrap">
                          <div className="flex items-center gap-2">
                            <StarIcon className="h-6 w-6 text-white fill-white" aria-hidden="true" />
                            <span className="text-lg font-medium">{woofer.starRating}</span>
                          </div>
                          <span className="text-lg underline">
                            Read Reviews ({woofer.numberOfReviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
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