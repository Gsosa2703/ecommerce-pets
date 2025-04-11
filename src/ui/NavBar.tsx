"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// shadcn/ui components (make sure these match your project paths):
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { petIcons } from "@/lib/petIcons";
import PetIcon from "@/ui/PetIcon";

export default function NavBar() {
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <header className="w-full sticky top-0 z-100 bg-white">
      {/* Top Banner */}
      <div className="hidden md:flex justify-between w-full items-center bg-yellow-200 px-4 py-3">
        <p className="text-sm font-semibold text-gray-700 text-center w-full">
          Compare top-rated pet insurance plans – Save up to $373 each year –
          Get a custom quote
        </p>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-4 py-2 text-lg">
          <div className="flex items-center w-full h-16">
            {/* Left: Logo */}
            <Link href="/">
              <Image src="/woof-logo.png" alt="Logo" width={250} height={200} className="h-8" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex md:items-center md:justify-between w-full space-x-6">
              {/* Services Mega Menu (NavigationMenu) */}
              <div className="flex items-center space-x-6">

                
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-6">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger        
                      className="text-lg font-medium text-gray-800 hover:text-gray-900 border-b-2 border-transparent hover:border-green-500 
                      transition-colors duration-200 ease-in-out">
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex items-center justify-center space-x-10 p-4 shadow-md rounded-md w-full max-w-screen-md mx-auto">
                          {petIcons.map((pet) => (
                            <PetIcon
                            key={pet.name}
                            name={pet.name}
                            slug={pet.slug}
                            imageUrl={pet.imageUrl}
                            />
                            ))}
                          </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/health-and-wellness" 
                      className="font-medium text-gray-800 hover:text-gray-900 border-b-2 border-transparent hover:border-green-500 
                          transition-colors duration-200 ease-in-out">
                        Health & Wellness
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/health-and-wellness" 
                       className="font-medium text-gray-800 hover:text-gray-900 border-b-2 border-transparent hover:border-green-500 
                       transition-colors duration-200 ease-in-out">
                        Resources
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div>

              {/* "Become a Caregiver" Dropdown (Mobile) */}
              <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded w-full font-medium text-green-600 text-xl">
                        <Image src="/heart-save.png" alt="heart" className="mr-3" width={30} height={30} />
                        Become a Woof!
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md rounded-md">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Caregiver
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Walker
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Sitter
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>

            </div>
  
            </div>

            {/* Hamburger for Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
        </div>

        {/* Mobile Menu (shown if hamburger is toggled) */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Top Banner in Mobile */}
            <div className="flex flex-col bg-yellow-200 px-4 py-2 space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Compare top-rated pet insurance plans – Save up to $373 each year –
                Get a custom quote
              </p>
            </div>

            {/* Services + Other Links in Mobile */}
            <div className="space-y-1 px-2 pt-2 pb-3 bg-white border-t">
              {/* Services Mega Menu (simplified approach for mobile):
                  Instead of a hover mega menu, we can just show a link or
                  replicate a smaller version. For brevity, this example
                  just lists them. */}
              <p className="px-3 py-2 font-medium text-gray-800">Services</p>
              <div className="pl-6 space-y-1">
                {petIcons.map((pet) => (
                  <Link
                    key={pet.name}
                    href={pet.imageUrl}
                    className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {pet.name}
                  </Link>
                ))}
                <Link href="/health-and-wellness" className="hover:underline">
                  Health & Wellness
                </Link>
                <Link href="/resources" className="hover:underline">
                  Resources
                </Link>
              </div>

            {/* "Become a Caregiver" Dropdown (Mobile) */}
            <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-2 border rounded text-gray-800 hover:bg-yellow-300 w-full text-left">
                    Become a Woof!
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md rounded-md">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Caregiver
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Walker
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                        A Woof Sitter
                      </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
          </div>
        )}


      </nav>
    </header>
  );
}
