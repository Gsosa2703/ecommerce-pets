'use client'

import Header from '@/ui/WooferProfile/Header'

import { woofers } from '@/lib/servicePage'
import React from 'react'
import { IWoofer } from '@/lib/woofers'
import TabsProfile from '@/ui/WooferProfile/Tabs'
export default function WoofersPage({ params }: { params: Promise<{ id: string }> }){
   const { id } = React.use(params)
   
    const woofer: IWoofer = woofers[id] ?? {}
 
 return (
  <div className='bg-[#fbf8f3]'>
     <Header woofer={woofer} />
     <TabsProfile woofer={woofer} />
  </div>

 )

}