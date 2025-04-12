
import TestimonialsSlider from "./TestimonialsSlider"
// import Image from "next/image";

export default function Testimonals() {
  return (
    <section className="w-full flex flex-col items-center pt-10 overflow-hidden relative">
      <div className="w-full h-[136px] bg-cover bg-no-repeat"  style={{backgroundImage: 'url(/wave.svg)'}}></div>
        <div className="flex flex-col items-center testimonials-container pt-10 pb-10">

          <h1 className="text-5xl font-bold text-green-400">Millions of 5-star services and counting</h1>
          <TestimonialsSlider options={{ slidesToScroll: 'auto' }} />
            {/* <Image
              src={'/banner.svg'}
              alt={'banner'}
              width={500} height={100}
            /> */}
        </div>

    </section>
   )
}