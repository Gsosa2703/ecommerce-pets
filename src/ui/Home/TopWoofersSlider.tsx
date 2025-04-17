"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/embla-carousel/EmblaCarouselArrowsButtons";
import useEmblaCarousel from "embla-carousel-react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import "@/css/embla.css";
import { IWoofer } from "@/lib/woofers";
import Link from "next/link";
import { motion } from "framer-motion";

type PropType = {
  options?: EmblaOptionsType;
};

const tagIcons: Record<string, string> = {
  Grooming: "💖",
  Professional: "⭐",
  Gentle: "🐾",
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const [woofers, setWoofers] = useState<IWoofer[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("woofers");
    if (stored) {
      try {
        const parsed: Record<string, IWoofer> = JSON.parse(stored);
        const firstFive = Object.values(parsed).slice(0, 7);
        setWoofers(firstFive);
      } catch (error) {
        console.error("Failed to parse woofers from localStorage", error);
      }
    }
  }, []);

  if (!woofers.length) {
    return <p className="text-center py-10 text-gray-500">Loading featured woofers...</p>;
  }

  return (
    <section className="embla_2 pt-10 md:pt-20 md:px-6 mx-auto max-w-[1500px]">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4 md:gap-6 px-4 md:px-6 justify-center">
          {woofers.map((woofer, index) => (
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              key={index}
              className="embla__slide w-[240px] md:w-[280px] lg:w-[300px] flex-shrink-0"
            >
              <Link
                href={`/woofers/${woofer.uid}`}
                className="block h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-cover bg-center bg-no-repeat relative"
                style={{
                  backgroundImage: `url(${woofer.profilePic})`,
                }}
              >
                {/* Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                  <h2 className="text-xl font-semibold leading-snug">{woofer.name}</h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {woofer.tags?.map((tag) => (
                      <Badge key={tag} className="bg-white text-black text-xs font-medium">
                        {tagIcons[tag] || "💬"} {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-white fill-white" />
                      <span className="text-sm font-medium">{woofer.starRating}</span>
                    </div>
                    <span className="text-sm underline hover:text-white transition">
                      Read Reviews ({woofer.numberOfReviews})
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="embla__controls mt-6">
        <div className="embla__buttons flex justify-center items-center gap-3">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
