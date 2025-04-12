
"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/embla-carousel/EmblaCarouselDotButtons'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/embla-carousel/EmblaCarouselArrowsButtons'
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";
import { StarIcon } from '@heroicons/react/24/outline';

import '@/css/embla.css'
import { testimonials } from '@/lib/home'
type PropType = {
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
   <section className="embla pt-20">
    <div className="embla__viewport overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className={`embla__slide flex flex-col items-center flex-none w-full md:w-1/3 px-10`}
                      >
                        <div className="">
                          <Image
                            src={testimonial.profilePic}
                            alt={testimonial.name}
                            width={100} height={100}
                          />
                        </div>
                        <div className='mt-3 flex items-center justify-center'>
                          {Array.from({ length: 5 }).map((_, i) => (
                           <StarIcon key={i} className="h-6 w-6 text-orange-400 fill-orange-400" aria-hidden="true" />
                          ))}
                         </div>

                        <span className="mt-3 text-lg">{testimonial.name}</span>
                        <p className="font-light text-gray-600 mt-4 h-[150px] max-h-[150px] overflow-y-auto scrollbar-hide text-lg">{testimonial.description}</p>
                      </div>
        ))}
      </div>
    </div>
  
    <div className="embla__controls">
      <div className="embla__buttons flex justify-center items-center my-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
  
      <div className="embla__dots flex justify-center">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`embla__dot px-2 ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
          />
        ))}
      </div>
    </div>
  </section>
 
  )
}

export default EmblaCarousel
