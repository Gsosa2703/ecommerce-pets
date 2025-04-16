"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[##fff3e0] text-gray-700 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        {/* Logo & About */}
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/woof-logo.png"
              alt="Woof Logo"
              width={200}
              height={45}
              className="mb-4 w-[150px] md:w-[200px]"
            />
          </Link>
          <p className="text-sm text-gray-400 max-w-xs">
            Bringing quality pet services to you – find the perfect care provider today.
          </p>
        </div>

        {/* Services */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-orange-400">Services</h3>
          <ul className="mt-4 space-y-2">
            {["Pet Walking", "Grooming", "Vet", "Training", "Overnight"].map((service) => (
              <li key={service}>
                <Link
                  href={`/${service.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-orange-400">Stay Connected</h3>
          <div className="flex space-x-4 mt-4">
            {[
              { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
              { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
              { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
            ].map(({ href, label, icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-white transition"
              >
                <i className={`ri-${icon}-fill text-xl text-gray-900`} />
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-orange-400 mb-2">
              Subscribe to Newsletter
            </h4>
            <form className="flex max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-1 flex-1 px-4 py-2 rounded-l-md bg-white text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 border-t border-gray-300 pt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Woof. All rights reserved.
      </div>
    </footer>
  );
}
