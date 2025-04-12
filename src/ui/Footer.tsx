"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-30 pb-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Left Section: Logo & Description */}
        <div className="mb-6 md:mb-0">
          <Link href="/" className="text-2xl font-bold">
            YourLogo
          </Link>
          <p className="mt-2 text-gray-500">
            Bringing quality pet services to you – find the perfect care provider today.
          </p>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="mb-6 md:mb-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-10">
          <div>
            <h3 className="text-lg font-semibold text-green-400">Services</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link 
                  href="/pet-walking" 
                  className="hover:text-gray transition-colors"
                >
                  Pet Walking
                </Link>
              </li>
              <li>
                <Link 
                  href="/grooming" 
                  className="hover:text-gray transition-colors"
                >
                  Grooming
                </Link>
              </li>
              <li>
                <Link 
                  href="/vet" 
                  className="hover:text-gray transition-colors"
                >
                  Vet
                </Link>
              </li>
              <li>
                <Link 
                  href="/training" 
                  className="hover:text-gray transition-colors"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link 
                  href="/overnight" 
                  className="hover:text-gray transition-colors"
                >
                  Overnight
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400">Company</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-gray transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="hover:text-gray transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="hover:text-gray transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-gray transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Social & Newsletter */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-green-400">Stay Connected</h3>
          <div className="flex space-x-4 mt-3">
            <Link 
              href="https://facebook.com" 
              aria-label="Facebook" 
              className="hover:text-gray transition-colors"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M22,12A10,10 0 1,0 12,22A10,10 0 0,0 22,12M12.07,17V12H10V10H12V8.5C12,6.57 13.57,5 15.5,5H17V7.5H15.5C15,7.5 14.93,7.77 14.93,8.25V10H17L16.5,12H14.93V17H12.07Z" />
              </svg>
            </Link>
            <Link 
              href="https://instagram.com" 
              aria-label="Instagram" 
              className="hover:text-gray transition-colors"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M7,2A5,5 0 0,0 2,7V17A5,5 0 0,0 7,22H17A5,5 0 0,0 22,17V7A5,5 0 0,0 17,2H7M12,17A5,5 0 1,1 17,12A5,5 0 0,1 12,17M17.5,6.5A1.5,1.5 0 1,1 16,5A1.5,1.5 0 0,1 17.5,6.5Z" />
              </svg>
            </Link>
            <Link 
              href="https://twitter.com" 
              aria-label="Twitter" 
              className="hover:text-gray transition-colors"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69A4.28,4.28 0 0,0 19.85,6.27C19.09,6.66 18.27,6.93 17.4,7.06A4.26,4.26 0 0,0 16.1,6.1C15.33,6.55 14.5,6.86 13.62,7A4.27,4.27 0 0,0 9.64,11C9.64,11 9.64,11 9.64,11C9.64,11.1 9.64,11.2 9.64,11.3A4.27,4.27 0 0,0 11.64,15C10.56,15.17 9.48,15.09 8.48,14.84A4.28,4.28 0 0,0 8,15.73V15.8A4.27,4.27 0 0,0 10.25,17C9.41,17.17 8.53,17.1 7.69,16.86A4.28,4.28 0 0,0 7,17.82V17.9A4.27,4.27 0 0,0 9.25,19C8.38,19.15 7.44,19.04 6.56,18.73C6.56,18.73 6.56,18.73 6.55,18.73C6.55,18.73 6.55,18.73 6.55,18.73A4.28,4.28 0 0,0 10.25,22C13.18,22 14.94,20.32 15.78,18A8.37,8.37 0 0,1 22,6.9C21.27,7.26 20.5,7.48 19.7,7.56A4.26,4.26 0 0,0 22.46,6Z" />
              </svg>
            </Link>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-green-400">
              Subscribe to Newsletter
            </h4>
            <form className="mt-2 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-900 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
