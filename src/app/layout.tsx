'use client'
import "./globals.css";
import Navbar from "@/ui/NavBar";
import { Montserrat } from "next/font/google";
import Footer from "@/ui/Footer";

// Configure Montserrat – adjust weights or subsets as necessary
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});


// This layout is used for all pages in the app
// It wraps the entire application and provides a consistent layout
// across all pages. It includes the global styles and font settings.
// app/layout.js

import {feedLocalStorge} from '@/lib/servicePage'
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // Run your initialization code once on client mount
    if(!window.localStorage.getItem('woofers') && !window.localStorage.getItem('services')){
      feedLocalStorge();
    }
  }, []);


  return (
    <html lang="en" className={montserrat.variable}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <head>
        <title>My Ecommerce & Blog App</title>
      </head>
      <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}

