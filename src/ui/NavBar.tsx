"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { petIcons } from "@/lib/petIcons";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from 'lenis/react'
import { AnimatePresence, motion } from "framer-motion";


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
          Your pet’s next best friend is just a click away — Browse services & book instantly.
        </p>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md">
        <div className="mx-auto md:px-4 py-2 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/">
            <Image src="/woof-logo.png" alt="Logo" width={250} height={45} className="w-[150px] md:w-[200px] logo" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between flex-wrap gap-y-2 w-full">
          {/* Service Nav Items */}
            <div className="flex items-center space-x-6 pl-3">
              {petIcons.map((pet) => (
                <Link
                  key={pet.name}
                  href={`/services/${pet.slug}`}
                  className="relative text-lg inline-block font-medium text-gray-800 whitespace-nowrap transition-colors duration-200 hover:text-green-500 group"
                >
                  {pet.name}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Nav Items */}
            <div className="flex items-center space-x-6 flex">
              {/* Current Location */}
              <div
                className="hidden xl:flex items-center text-base font-medium text-gray-600 transition-colors duration-200 hover:text-orange-500 whitespace-nowrap"
              >
                <MapPin className="mr-1" /> {currentLocation}
              </div>

                {/* Become a Woof! Button */}
              <Link href="/become">
                <div className="cursor-pointer">
                  <Button variant={'outline'} className="cursor-pointer flex items-center gap-2 text-green-600 hover:bg-green-400 hover:text-white text-xl">
                    Become a Woofer!
                  </Button>
                </div>
              </Link>

              {/* Auth Buttons styled as orange buttons */}
              <Link
                href="/auth"
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded whitespace-nowrap transition-colors duration-200"
              >
                Login
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
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              <p className="px-3 py-2 font-medium text-gray-800 text-lg">Services</p>
              <div className="pl-6 space-y-1">
                {petIcons.map((pet) => (
                  <Link
                    key={pet.name}
                    href={`/services/${pet.slug}`}
                    className="block px-3 py-2 text-base font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded"
                  >
                    {pet.name}
                  </Link>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Link
                  href="/auth"
                >
                  <Button className="w-full text-center px-4 py-2 bg-orange-400 text-white text-xl" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/become">
                  <Button className="w-full text-center px-4 py-2 text-green-600 text-xl" variant="outline">
                    Become a Woofer!
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </nav>
    </section>
  );
}
