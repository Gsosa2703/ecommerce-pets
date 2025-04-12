
import TestimonialsSlider from "./TestimonialsSlider"
import Image from "next/image";

export default function Testimonals() {
  return (
    <section className="w-full h-screen flex flex-col items-center pt-10 overflow-hidden">
      <h1 className="text-5xl font-bold text-green-400">Millions of 5-star services and counting</h1>
      <TestimonialsSlider options={{ slidesToScroll: 'auto' }} />
         <Image
           src={'/banner.svg'}
           alt={'banner'}
           width={500} height={100}
         />
    </section>
   )
}