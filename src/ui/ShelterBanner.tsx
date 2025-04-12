
import Image from "next/image";

export default function ShelterBanner() {
  return (
    <section className="w-full flex flex-col items-center pt-10 overflow-hidden relative">
      
      
      <div className=" w-full h-full flex flex-col md:flex-row justify-center items-center bg-no-repeat bg-cover pt-20"  style={{backgroundImage: 'url(/hearts-bg.svg)'}}>

      <div className="flex flex-col items-center pt-30 md:pt-50">
         <Image
                src={'/shelter-image.svg'}
                alt={'banner'}
                width={500} height={100}
              />
        </div>
        <div className="flex justify-end flex-col h-full pt-30 md:pt-50">
          <h1 className="text-5xl font-bold text-white pb-10">Feeding shelter dogs with each Woofer Service</h1>
          <h2 className="text-3xl font-bold text-white pb-5">We have donated over 16,500,000 meals!</h2>
          <p className="text-2xl text-white">A portion of the proceeds from each walk you book helps to feed a shelter dog in your area. It’s just one of the many ways Wag! gives back and helps you become a part of something larger.</p>
        </div>

      </div>

      <div className="w-full h-[200px] bg-cover bg-no-repeat"  style={{backgroundImage: 'url(/green-wave.png)'}}></div>
    </section>
   )
}