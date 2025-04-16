"use client";
import { ReactLenis } from 'lenis/react'
import Navbar from "@/ui/NavBar";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
 return (
  <>
   <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
    <Navbar />
    {children}
   </ReactLenis>
  </>
 );
}

export default SmoothScrolling;
