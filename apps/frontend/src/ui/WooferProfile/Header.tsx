"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons from lucide-react or heroicons
import { MapPin, Heart, MessageSquare, Phone } from "lucide-react";
import { IWoofer } from "@/lib/woofers";

import {ClockIcon, CalendarIcon, HomeIcon, AcademicCapIcon, ScissorsIcon, SparklesIcon, IdentificationIcon, StarIcon } from '@heroicons/react/24/outline'
import { motion } from "framer-motion";
export default function WooferProfileHeader({woofer}: {woofer: IWoofer}) {
 const { name, avatarUrl, location, starRating, numberOfReviews, services, badges } = woofer;
  return (
    <section className="w-full">
      {/* A container to center the card */}
      <div className=" pawprints-bg h-[200px] md:h-[300px] lg:h-[200px] xl:h-[250px]">

      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 mt-[-160px]">
        {/* White card with shadow, fully responsive layout */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-100 p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Column 1: Avatar + Info (col-span-3) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start gap-4">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name?.[0] ?? "W"}</AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
              <div className="mt-1 flex items-center justify-center md:justify-start gap-1 text-gray-500">
                <MapPin className="h-4 w-4" /> {location}
              </div>

              <div className="mt-1 flex items-center justify-center md:justify-start gap-2">
                <StarIcon className="h-5 w-5 text-orange-400 fill-orange-400" />
                <span className="text-gray-800 font-semibold">{starRating.toFixed(1)}</span>
                <span className="text-gray-500">({numberOfReviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services, Badges, Star Woofer Info (col-span-6) */}
          <div className="icons-header md:col-span-6 flex flex-col gap-4">
            {/* Services */}
            <div className="flex flex-wrap gap-2">
              {services?.map((svc, i) => (
                <Badge key={i} variant="outline" className="text-base border-none">
                  {svc === "Grooming" && <ScissorsIcon className="mr-1 h-6 w-6" />}
                  {svc === "DogWalk" && <SparklesIcon className="mr-1 h-4 w-4" />}
                  {svc === "Training" && <AcademicCapIcon className="mr-1 h-4 w-4" />}
                  {svc === "Vet" && <IdentificationIcon className="mr-1 h-4 w-4" />}
                  {svc === "PetSitting" && <HomeIcon className="mr-1 h-6 w-6" />}
                  {svc}
                </Badge>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {badges?.map((badge, i) => (
                <Badge key={i} variant="outline" className="bg-[#fbf8f3] rounded-full text-sm">
                  {badge === "Under 1 hour response" && <ClockIcon className="mr-1 h-4 w-4" />}
                  {badge === "1km near you" && <HomeIcon className="mr-1 h-4 w-4" />}
                  {badge === "5+ years experience" && <CalendarIcon className="mr-1 h-4 w-4" />}
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Star Woofer */}


            
            {woofer.isStar && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm w-fit"
                  >
                    <StarIcon className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <div>
                      <h4 className="text-yellow-700 font-semibold text-base">Star Woofer</h4>
                      <p className="text-sm text-yellow-700">
                        Recognized for outstanding feedback, loyalty, and care.
                      </p>
                    </div>
                  </motion.div>
                )}
          </div>

          {/* Column 3: Action Buttons (col-span-3) */}
          <div className="md:col-span-3 flex flex-col items-stretch gap-3">
            <Button className="w-full py-4 text-base bg-green-400 hover:bg-green-500 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message
            </Button>
            <Button variant="outline" className="w-full py-4 text-base flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Contact
            </Button>
            <button className="cursor-pointer mt-1 text-gray-400 hover:text-red-500 mx-auto" aria-label="Favorite">
              <Heart className="h-6 w-6 hover:fill-red-500 transition-all" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
