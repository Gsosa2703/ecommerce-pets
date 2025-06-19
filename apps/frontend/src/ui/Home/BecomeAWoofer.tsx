import { Button } from "@/components/ui/button"

import Image from "next/image";
import Link from "next/link";

export default function BecomeAWoofer() {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center md:items-center px-4 py-10 md:p-20 overflow-hidden">

     <div className="mr-10 mb-5">
      <h2 className="text-2xl md:text-3xl font-bold text-orange-400 pb-3">Largest Pet Provider Services</h2>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-400">
        Animal lovers wanted!
      </h1>
      <p className="pt-5 md:pt-10 font-medium text-gray-500 text-xl md:text-2xl pb-10">
         Are you a dog lover with pet care experience? <br />
         Want to earn money working with dogs? <br />
         Learn more about becoming a dog walker, sitter, or trainer in your city.
       </p>
       <Link href={'/become'}>
        <Button variant="outline" className="cursor-pointer bg-orange-500 hover:bg-orange-600 hover:text-white text-white font-bold text-xl p-7 w-full md:w-[50%]">Become A Woofer!</Button>
       </Link>
     </div>

     <div>
         <Image
              src={'/woofer.jpg'}
              alt={'woofer'}
              width={500} height={100}
              className="w-full md:w-[600px]"
           />
         <Image
              src={'/banner.svg'}
              alt={'banner'}
              width={500} height={100}
              className="w-full md:w-[600px] md:ml-[-100px] mt-[-30px]"
           />
     </div>
    </section>
   )
}