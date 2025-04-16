
"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/embla-carousel/EmblaCarouselArrowsButtons'
import useEmblaCarousel from 'embla-carousel-react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Badge } from "@/components/ui/badge"

import '@/css/embla.css'
import { woofers } from '@/lib/woofers'
type PropType = {
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
   <section className="embla_2 pt-10 md:pt-20 md:px-6 mx-auto max-w-[1500px]">
    <div className="embla__viewport overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex touch-pan-y flex-nowrap">
        {woofers.map((woofer, index) => (
                      <div
                        key={index}
                        className="embla__slide flex flex-col m-2 items-center max-w-full shrink-0 grow-0 pl-4 basis-full md:basis-6/12 lg:basis-4/12 px-10
                        bg-cover bg-center bg-no-repeat relative rounded-xl"  style={{
                         backgroundImage: `url(${woofer.profilePic})`,
                       }}
                      >
                        
                        <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>

                        <div className="w-full flex flex-col text-white relative z-10 overflow-hidden rounded-regular h-[640px] max-w-[341px]">
                              <div className='flex h-full w-full flex-col justify-end mb-10'>
                                <div className='flex flex-col gap-y-4'>
                                  <span className="text-3xl font-medium">{woofer.name}</span>
                                  <div className="flex flex-wrap gap-2">
                                      {woofer.tags.map((tag, index) => {
                                      const icon = index === 1 ? '⭐' : index === 2 ? '🐾' : index === 3 ? '💖' : '💖'
                                      return <Badge key={tag} variant="outline" className="bg-white text-md">{icon} {tag}</Badge>
                                      } )}
                                  </div>
                                  <div className="w-full flex items-center justify-between">
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
  
    <div className="embla__controls">
      <div className="embla__buttons flex justify-center items-center my-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  </section>
 
  )
}

export default EmblaCarousel

