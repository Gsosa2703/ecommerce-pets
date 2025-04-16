"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { petIcons } from "@/lib/petIcons";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from 'lenis/react'


export default function NavBar() {
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Mocked current location
  const currentLocation = "San Francisco, NY";

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useLenis((lenis) => {
    lenis.on("scroll", ({ direction }: { direction: number }) => {
      setIsNavbarVisible(direction <= 0);
    });
  });

  return (
    <section 
     className={`w-full sticky top-0 transition-all duration-500 ease-in-out z-100 ${isNavbarVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
    >
      {/* Top Banner */}
      <div className="hidden md:flex justify-center items-center bg-orange-200 px-4 py-3">
        <p className="text-sm font-semibold text-gray-700 text-center w-full">
          Compare top-rated pet insurance plans – Save up to $373 each year – Get a custom quote
        </p>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-4 py-2 flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/">
            <Image src="/woof-logo.png" alt="Logo" width={250} height={45} className="logo" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Service Nav Items */}
            <div className="flex items-center space-x-6">
              {petIcons.map((pet) => (
                <Link
                  key={pet.name}
                  href={`/services/${pet.slug}`}
                  className="relative inline-block font-medium text-gray-800 whitespace-nowrap transition-colors duration-200 hover:text-green-500 group"
                >
                  {pet.name}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Nav Items */}
            <div className="flex items-center space-x-6">
              {/* Current Location */}
              <div
                className="flex items-center text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-green-500 whitespace-nowrap"
              >
                <MapPin className="mr-1" /> {currentLocation}
              </div>
              {/* Auth Buttons styled as orange buttons */}
              <Link
                href="/signup"
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded whitespace-nowrap transition-colors duration-200"
              >
                Login
              </Link>
              {/* Become a Woof! Button */}
              <Link href="/become">
                <div className="cursor-pointer">
                  <button className="cursor-pointer flex items-center gap-2 text-green-600 text-xl">
                    <Image src="/heart-save.png" alt="heart" width={30} height={30} className="mr-2" />
                    Become a Woof!
                  </button>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Nav Header */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 bg-white border-t">
              {/* Services */}
              <p className="px-3 py-2 font-medium text-gray-800">Services</p>
              <div className="pl-6 space-y-1">
                {petIcons.map((pet) => (
                  <Link
                    key={pet.name}
                    href={`/services/${pet.slug}`}
                    className="block px-3 py-2 text-lg font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded whitespace-nowrap"
                  >
                    {pet.name}
                  </Link>
                ))}
              </div>
              {/* Current Location */}
              <div className="px-3 py-2">
                <div
                  className="pb-5 flex items-center text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-green-500 whitespace-nowrap"
                >
                  <MapPin className="mr-1" /> {currentLocation}
                </div>
                <Link
                    href="/signup"
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded whitespace-nowrap transition-colors duration-200"
                  >
                Login
              </Link>
              </div>
              {/* Become a Woof! Button */}
              <div className="mt-2 px-3">
                <Link href="/become">
                  <Button className="cursor-pointer w-full flex items-center justify-center text-green-600 text-xl" variant={'outline'}>
                    <Image src="/heart-save.png" alt="heart" width={30} height={30} className="mr-2" />
                    Become a Woof!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </section>
  );
}
