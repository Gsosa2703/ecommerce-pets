"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from "next/image";
import Link from "next/link";

import { petIcons } from "@/lib/petIcons";

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = petIcons[activeIndex];

  return (
    <div className="md:pl-10 md:pr-10 lg:pl-40 lg:pr-40">
      {/* Swiper for service icons */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={5}
        navigation
        pagination={false}
        onClick={(swiper) => {
         setActiveIndex(swiper.clickedIndex)
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="hero-slider bg-gray-100 rounded-tl-lg rounded-tr-lg"
      >
        {petIcons.map((service, index) => (
          <SwiperSlide key={service.name} >
            <div
              className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition
                ${
                  index === activeIndex
                    ? "border-b-4 border-green-500"
                    : "border-b-4 border-transparent"
                }`}
            >
              <div className="relative h-26">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={100} height={100}
                  className="object-contain"
                />
              </div>
              <p className="text-xl whitespace-nowrap font-bold pt-3 text-gray-600">{service.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Detailed content for the currently active slide */}
      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap bg-white p-9 rounded-bl-lg rounded-br-lg shadow-md">
        <p className="md:w-[70%] text-gray-700 font-medium mb-4 md:text-2xl">{activeService.description}</p>
        <div className="md:w-[30%] pl-4">
         <Link href={`services/${activeService.slug}`}>
           <button className="w-full md:text-xl font-bold cursor-pointer px-5 py-2 bg-orange-400 text-white rounded hover:bg-orange-500">
             {activeService.buttonLabel}
           </button>
         </Link>
        </div>
      </div>
    </div>
  );
}
