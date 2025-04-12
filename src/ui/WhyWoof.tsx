
import { reasons } from "@/lib/home";
import WhyReason from "./WhyReason";


export default function WhatWoof() {
  return (
    <section className="w-full relative flex flex-col items-center justify-center lg:pt-[250px] md:pt-[400px] pt-[300px] overflow-hidden">
      <h1 className="text-5xl font-bold text-orange-400">Why Woof!?</h1>
      <div className="py-10">
        {reasons.map((reason) => {
          return (
            <WhyReason key={reason.title} title={reason.title} description={reason.description} imageUrl={reason.imageUrl} />
          )
        })}
      </div>
    </section>
   )
}
