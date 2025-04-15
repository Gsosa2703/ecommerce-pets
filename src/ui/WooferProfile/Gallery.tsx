import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper'; // <-- Import the type here

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Gallery({gallery}: {gallery: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);

  return (
    <>
    <div className='flex flex-col md:flex-row justify-center items-center pt-4'>

       <Swiper
           style={{
             '--swiper-navigation-color': '#fff',
             '--swiper-pagination-color': '#fff',
           } as React.CSSProperties}
           navigation={false}
           thumbs={{ swiper: thumbsSwiper }}
           modules={[FreeMode, Navigation, Thumbs]}
           slidesPerView={1}
           className="mySwiper2 max-w-xl"
         >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
                <Image src={img} alt='image' className=" rounded-lg w-[320px] md:w-[550px]" width={500} height={500} />
            </SwiperSlide>

          ))}

         </Swiper>
         <Swiper
           onSwiper={(swiper) => setThumbsSwiper(swiper)}
           spaceBetween={10}
           slidesPerView={4}
           freeMode={true}
           watchSlidesProgress={true}
           modules={[FreeMode, Navigation, Thumbs]}
           className="gallery-profile"
         >
          {gallery.map((img, i) => (
            <SwiperSlide key={i} className='w-[50%] cursor-pointer'>
                <Image src={img} alt='image' className=' rounded-lg transition-transform duration-300 ease-in-out hover:scale-110' width={100} height={100} />
            </SwiperSlide>

          ))}
         </Swiper>

    </div>
      
    </>
  );
}
