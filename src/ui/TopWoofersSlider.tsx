import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { woofers } from "@/lib/woofers"

import { Badge } from "@/components/ui/badge"

import { StarIcon } from '@heroicons/react/24/outline';

export default function CarouselSize() {
  return (
     <Carousel
       opts={{
         align: "start",
       }}
       className= "w-full md:w-auto ml-4 pt-5">
       <CarouselContent>
         {woofers.map((woofer, index) => (
           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 md:w-[150px] lg:w-[250px] xl:w-[270px]">
            <div className="p-1">
               <Card className="w-full relative rounded-lg shadow-md 
                      bg-cover bg-center bg-no-repeat"  style={{
                       backgroundImage: `url(${woofer.profilePic})`,
                     }}>
                    <div className="absolute inset-0 bg-black opacity-30"></div>

                   <CardContent className="w-full flex flex-col aspect-square justify-end p-6 text-white relative z-10">
                      <span className="text-3xl font-medium pb-5">{woofer.name}</span>
                       <div className="flex flex-wrap gap-2">
                          {woofer.tags.map((tag, index) => {
                           const icon = index === 1 ? '⭐' : index === 2 ? '🐾' : index === 3 ? '💖' : '💖'
                           return <Badge key={tag} variant="outline" className="bg-white text-md">{icon} {tag}</Badge>
                           } )}
                       </div>
                       <div className="w-full flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 mt-2">
                            <StarIcon className="h-6 w-6 text-white fill-white" aria-hidden="true" />
                            <span className="text-lg font-medium">{woofer.starRating}</span>
                          </div>
                          <span className="text-lg underline">Read Reviews ({woofer.numberOfReviews})</span>
                       </div>
                   </CardContent>
                 </Card>
               </div>
           </CarouselItem>
         ))}
       </CarouselContent>
       <CarouselPrevious />
       <CarouselNext />
     </Carousel>
  )
}
