'use client'
import React, { useState } from 'react';

import Image from 'next/image'
// import required modules

export default function Gallery({gallery}: {gallery: string[]}) {
 
    const [selectedImage, setSelectedImage] = useState(gallery[0])

    // Up to 4 images for thumbnails (change logic if you want more)
    const thumbnailImages = gallery.slice(0, 5).slice(1)
  
    return (
      <div className=" px-5 md:px-15 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 overflow-hidden md:px-15">
        {/* Main Image (left side on md+ screens) */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src={selectedImage}
            alt="Main Hostel Image"
            fill
            className="object-cover rounded-md"
          />
        </div>
  
        {/* Thumbnails (right side on md+ screens) */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 min-h-[300px]">
          {thumbnailImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className="relative h-[140px] md:h-auto border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md hover:border-orange-400 transition"
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-103 object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
  )
}
