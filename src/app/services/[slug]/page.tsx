 

'use client'

import { StarIcon } from '@heroicons/react/24/outline'

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
import SortingBar from '@/ui/SortingBar'

import Link from 'next/link'
import { IWoofer } from '@/lib/woofers'
import {ServiceType, ServicesMap} from '@/lib/servicePage'
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FiImage } from 'react-icons/fi'
import { Badge } from '@/components/ui/badge';
import { ShieldCheckIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/solid'
import { FaRegLaughWink, FaUserShield } from 'react-icons/fa'
import { PawPrintIcon } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { DateRange } from 'react-day-picker'
import Image from "next/image";


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
  
  // Filtering state for woofer list
  const [filteredWoofers, setFilteredWoofers] = useState<IWoofer[]>(paginatedWoofers) 

  const availableBadges = ["Funny", "Certified", "Caring", "Responsible", "Animal Lover", "Punctual"]
  const [activeBadge, setActiveBadge] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [filters, setFilters] = useState<{
    onlyVerified: boolean
    starOnly: boolean
    maxPrice: number
    dateRange: DateRange | null
  }>({
    onlyVerified: false,
    starOnly: false,
    maxPrice: 200,
    dateRange: null,
  })
  

  const badgeIcons: Record<string, React.ReactNode> = {
    Funny: <FaRegLaughWink className="w-4 h-4 text-pink-600" />,
    Certified: <ShieldCheckIcon className="w-4 h-4 text-green-400" />,
    Caring: <HeartIcon className="w-4 h-4 text-red-600" />,
    Responsible: <FaUserShield className="w-4 h-4 text-blue-500" />,
    "Animal Lover": <PawPrintIcon className="w-4 h-4 text-yellow-500" />,
    Punctual: <ClockIcon className="w-4 h-4 text-orange-400" />,
  }

  

    const [sortKey, setSortKey] = useState<'rating' | 'reviews' | 'price'>('rating')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')


    // Synchronize filteredWoofers with paginatedWoofers when service.woofers or currentPage changes
    useEffect(() => {
      if (!service.woofers) return
    
      let base = [...service.woofers]
    
      // Filtro: Verified
      if (filters.onlyVerified) {
        base = base.filter(w => w.isVerified)
      }
    
      // Filtro: Star Woofer (aquí podés usar una propiedad como `w.isStar`)
      if (filters.starOnly) {
        base = base.filter(w => w.isStar)
      }
    
      // Filtro: Max Price
      base = base.filter(w => w.price! <= filters.maxPrice)
    
      // Filtro: Fecha (puede ser más avanzada si tenés disponibilidad)
      if (filters.dateRange?.from && filters.dateRange?.to) {
        // Este ejemplo filtra todos (ya que no hay campo `availability`)
        base = base.filter((_, i) => i % 2 === 0) // mock temporal
      }
    
      // Filtro: Badge
      if (activeBadge) {
        base = base.filter(w =>
          w.badgesFilters?.some(b => b.toLowerCase() === activeBadge.toLowerCase())
        )
      }

      const sortKeyWoof = sortKey === 'rating' ? 'starRating' : sortKey === 'reviews' ? 'numberOfReviews' : 'price'
    
      // Ordenamiento
      base.sort((a, b) => {
        const aVal = a[sortKeyWoof]!
        const bVal = b[sortKeyWoof]!
    
        if (sortOrder === 'asc') return aVal - bVal
        return bVal - aVal
      })
    
      // Paginación
      const start = (currentPage - 1) * ITEMS_PER_PAGE
      const end = currentPage * ITEMS_PER_PAGE
      setFilteredWoofers(base.slice(start, end))
    }, [service.woofers, filters, activeBadge, sortKey, sortOrder, currentPage])
    


  const handleSortChange = (key: 'rating' | 'reviews' | 'price', order: 'asc' | 'desc') => {
    setSortKey(key)
    setSortOrder(order)
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

  return (
    <section className="w-full overflow-x-hidden pb-10">

      <div
        className={`
              banner-${slugModified}
              w-full px-10 pt-15 md:pt-5 md:px-30 md:pt-15 bg-cover bg-no-repeat relative flex flex-col h-[400px] md:h-[400px] lg:h-[300px] xl:h-[500px]
          `}

          style={{ backgroundPosition: "center bottom", backgroundImage: `url(${service.banner})` }}

      >
        <div>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <h3 className="text-white text-medium md:text-xl font-medium mb-5">{service.subtitle}</h3>
        </div>
      </div>

    <div className='px-10 pt-10'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <h2 className='text-lg font-semibold'>{filteredWoofers.length} Woofers Available</h2>
        <div className='flex gap-3 flex-col md:flex-row items-center'>
          <SortingBar onChange={handleSortChange} />
          <div className='flex gap-3'>
            
          <div className="md:hidden flex justify-between items-center mt-4 mb-4">
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-medium">
                      Filters
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="px-4 pb-6 pt-4">
                    <DrawerHeader>
                      <DrawerTitle>Filters</DrawerTitle>
                    </DrawerHeader>

                    <FilterBar
                      onToggleVerified={(checked) =>
                        setFilters((prev) => ({ ...prev, onlyVerified: checked }))
                      }
                      onSubmitFilterBar={(newFilters) => {
                          setFilters((prev) => ({
                            ...prev,
                            ...newFilters,
                          
                          }))
                          setDrawerOpen(false)
                        }
                      }
                    />
                  </DrawerContent>
                </Drawer>
            </div>
              <button
                  onClick={() => {
                    setFilters({
                      onlyVerified: false,
                      starOnly: false,
                      maxPrice: 200,
                      dateRange: null,
                    })
                    setActiveBadge(null)
                    setCurrentPage(1)
                  }}
                  className="cursor-pointer ml-4 text-sm text-gray-500 underline hover:text-gray-700"
                >
                  Clear Filters
              </button>


          </div>

        </div>
      </div>


      {/* Render your sorted list here */}
      <Separator />
    </div>
    <div className="px-4 md:px-10">
        {/* Badge filters */}
        <div className="flex flex-wrap justify-center md:justify-center gap-4 py-10">
          {availableBadges.map((badge) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={badge}
              onClick={() => setActiveBadge((prev) => (prev === badge ? null : badge))}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeBadge === badge
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"}`}
            >
              {badgeIcons[badge]} {badge}
            </motion.button>
          ))}
        </div>

        {/* Layout principal con sidebar + lista */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar desktop */}
          <div className="hidden md:flex md:w-[400px] md:sticky top-6 h-fit self-start">
          <FilterBar
              onToggleVerified={(checked) =>
                setFilters((prev) => ({ ...prev, onlyVerified: checked }))
              }
              onSubmitFilterBar={(newFilters) =>
                setFilters((prev) => ({
                  ...prev,
                  ...newFilters,
                }))
              }
            />
          </div>

          {/* Lista de woofers */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                
          {filteredWoofers.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No woofers found
              </h3>
              <p className="text-gray-500 max-w-md">
                Try adjusting your filters or&nbsp;
                <button
                  onClick={() => {
                    setFilters({
                      onlyVerified: false,
                      starOnly: false,
                      maxPrice: 200,
                      dateRange: null,
                    });
                    setActiveBadge(null);
                    setCurrentPage(1);
                  }}
                  className="text-orange-500 underline hover:text-orange-600"
                >
                  clear all filters
                </button>{" "}
                and try again.
              </p>
            </div>
          ) : (filteredWoofers.map((woofer) => (
                  <Link key={woofer.uid} href={`/woofers/${woofer.uid}`}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.15)" }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer max-w-sm w-full"
                    >
                      {/* Imagen */}
                      <div className="h-40 bg-gradient-to-r from-green-100 to-orange-300 flex justify-center items-center">
                        <Avatar className="w-28 h-28 border-4 border-white mt-15">
                          {woofer.avatarUrl ? (
                            <AvatarImage src={woofer.avatarUrl} alt="Profile Photo" />
                          ) : (
                            <AvatarFallback>
                              <FiImage className="text-5xl text-gray-300" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>

                      {/* Info */}
                      <div className="pt-14 pb-6 px-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <h3 className="text-lg font-semibold text-gray-800">{woofer.name}</h3>
                          {woofer.isVerified && (
                            <Badge className="flex items-center gap-1 bg-green-100 text-green-700 border border-green-300">
                              <ShieldCheckIcon className="w-4 h-4" />
                              Verified
                            </Badge>
                          )}
                          <p className="text-sm text-gray-500">{woofer.location}</p>
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-1">
                          <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">{woofer.starRating}</span>
                          <span className="text-sm text-gray-400">({woofer.numberOfReviews})</span>
                        </div>

                        <div className="mt-3 flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">{woofer.services?.[0]}</p>
                            <p className="text-lg font-bold text-gray-800">${woofer.price}</p>
                          </div>
                          { woofer.isStar &&
                          <Image src="/heart-star.png" alt="star woofer" width={100} height={100} className="w-6 h-6" />
                          }
                        
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )) )}
              </AnimatePresence>
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
          </div>
        </div>
    </div>

    </section>
  )
}