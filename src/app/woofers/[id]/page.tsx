'use client'

import Header from '@/ui/WooferProfile/Header'

import React, { useEffect, useState } from 'react'
import { IWoofer } from '@/lib/woofers'
import TabsProfile from '@/ui/WooferProfile/Tabs'
import BookForm from '@/ui/WooferProfile/BookForm'
import { DateRange } from 'react-day-picker'
import Gallery from '@/ui/WooferProfile/Gallery'

export default function WoofersPage({ params }: { params: Promise<{ id: string }> }){
   const { id } = React.use(params)

   const [woofers, setWoofers] = useState<Record<string, IWoofer>>({})

   useEffect(() => {
       // This code runs only on the client
      const value = window.localStorage.getItem("woofers")
      setWoofers(JSON.parse(value ||''))
   }, [])

   const woofer: IWoofer = woofers[id] ?? {}

    
    function handleDateChange(date?: DateRange | undefined) {
      console.log(date)
    }

    if (!Object.keys(woofer).length) {
      return <p>Loading services...</p>;
    }

 return (
  <div className='bg-[#fbf8f3] pb-30'>
   <Header woofer={woofer} />
   <Gallery gallery={woofer.gallery!} />

      <div className="pt-10 md:px-15 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 relative">
        {/* Left side: Tabs and main content */}
        <div>
          <TabsProfile woofer={woofer} />
        </div>

        {/* Right side: Sticky booking form */}
        <div className="self-start md:sticky top-40  w-full">
          <BookForm onDateRangeSelect={handleDateChange} />
        </div>
      </div>

  </div>

 )

}