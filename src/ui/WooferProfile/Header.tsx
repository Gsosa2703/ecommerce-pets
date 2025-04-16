"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons from lucide-react or heroicons
import { MapPin, Heart, MessageSquare, Phone } from "lucide-react";
import { IWoofer } from "@/lib/woofers";

import {ClockIcon, CalendarIcon, HomeIcon, AcademicCapIcon, ScissorsIcon, SparklesIcon, IdentificationIcon, StarIcon } from '@heroicons/react/24/outline'
export default function WooferProfileHeader({woofer}: {woofer: IWoofer}) {
 const { name, avatarUrl, location, starRating, numberOfReviews, services, badges } = woofer;
  return (
    <section className="w-full">
      {/* A container to center the card */}
      <div className=" pawprints-bg h-[200px] md:h-[300px] lg:h-[200px] xl:h-[250px]">

      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 mt-[-160px]">
        {/* White card with shadow, fully responsive layout */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-100 p-6 flex flex-col gap-4 md:flex-row md:justify-between">
          {/* Left Column: avatar + info */}
          <div className="flex flex-col gap-4">
            {/* Main profile row: avatar + user info */}
            <div className="mt-2 flex flex-col gap-4">
              {/* Avatar */}
              <Avatar className="h-30 w-30 border-5 border-white shadow-lg">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name?.[0] ?? "W"}</AvatarFallback>
              </Avatar>

              {/* Name, location, rating */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                  {name}
                </h1>

                <div className="mt-1 flex items-center gap-1 text-lg text-gray-500">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{location}</span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <StarIcon  className="h-6 w-6 text-orange-400 fill-orange-400" aria-hidden="true" />
                    <span className="text-gray-800 font-semibold text-lg">
                      {starRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-500 text-lg">
                    ({numberOfReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Services row */}
           <div className="flex flex-wrap items-center gap-2font-medium text-gray-600 pb-5">
              {services!.map((svc, i) => (
                <Badge key={i} variant="outline" className="badge-profile-woofer text-lg border-none">
                  {svc === "Grooming" && <ScissorsIcon className="mr-1" aria-hidden="true" />}
                  {svc === "DogWalk" && <SparklesIcon className="mr-1" aria-hidden="true" />}
                  {svc === "Training" && <AcademicCapIcon className="mr-1" aria-hidden="true" />}
                  {svc === "Vet" && <IdentificationIcon className="mr-1" aria-hidden="true" />}
                  {svc === "PetSitting" && <HomeIcon className="mr-1" aria-hidden="true" />}

                  {svc}
                </Badge>
              ))}
            </div>

            {/* Another row for special badges */}
            <div className="flex flex-wrap items-center gap-2 font-medium text-gray-500">
              {badges!.map((badge, i) => (
                <Badge key={i} variant="outline" className="badge-profile-woofer bg-[#fbf8f3] rounded-full text-base border-1">
                  {badge === "Under 1 hour response" && <ClockIcon className="mr-1" aria-hidden="true" />}
                  {badge === "1km near you" && <HomeIcon className="mr-1" aria-hidden="true" />}
                  {badge === "5+ years experience" && <CalendarIcon className="mr-1" aria-hidden="true" />}
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column: Buttons (Message, Contact), etc. */}
          <div className="flex flex-col items-stretch gap-2 md:items-end">
            <Button className="w-full p-5 rounded-lg md:w-auto flex items-center gap-2 bg-green-400 hover:bg-green-500 cursor-pointer">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Message
            </Button>
            <Button variant="outline" className="w-full p-5 rounded-lg md:w-auto flex items-center gap-2 cursor-pointer">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Contact
            </Button>
            {/* Possibly a favorite button */}
            <button
              className="mt-2 text-gray-500 hover:text-red-500"
              aria-label="Favorite"
            >
              <Heart className="h-6 w-6 cursor-pointer hover:fill-red-600" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
