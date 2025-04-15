import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IWoofer } from "@/lib/woofers"
import Img from 'next/image'
import {HomeIcon, AcademicCapIcon, ScissorsIcon, SparklesIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from '@heroicons/react/24/outline';
import Gallery from "./Gallery"


export default function TabsProfile({woofer}: {woofer: IWoofer}) {
  return (
    <section className="w-full max-w-5xl mx-auto mt-10">
     <Tabs defaultValue="about" orientation="horizontal">
       <TabsList className="w-full bg-[#f7f0e4] p-3">
         <TabsTrigger value="about" className="text-lg p-3 cursor-pointer">About</TabsTrigger>
         <TabsTrigger value="reviews" className="text-lg p-3 cursor-pointer">Reviews</TabsTrigger>
         <TabsTrigger value="gallery" className="text-lg p-3 cursor-pointer">Gallery</TabsTrigger>
       </TabsList>
       <TabsContent value="about" className="bg-white w-full p-5 rounded-lg shadow-lg shadow-gray-200 mt-2 border border-gray-200">
         <div className="tab-about">
          <div className="flex flex-col pb-5">
            <div className="flex items-baseline gap-3 pb-3">
             <Img src="/paw-icon.png" alt="paw orange icon"  height={100} width={100} className="w-[30px] h-[10px]" />
             <h2 className="text-xl font-bold">Bio</h2>
            </div>
             <p className="text-gray-500 pl-4">{woofer.bioProfile}</p>
          </div>

          <div className="flex flex-col pb-5">
            <div className="flex items-baseline gap-3 pb-3">
             <Img src="/paw-icon.png" alt="paw orange icon"  height={100} width={100} className="w-[30px] h-[10px]" />
             <h2 className="text-xl font-bold">Achievements</h2>
            </div>
             <ul className="pl-4">{woofer.achievements?.map((a) => (
               <li key={a} className="list-disc text-gray-500">{a}</li>
             ))}</ul>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-3 pb-3">
             <Img src="/paw-icon.png" alt="paw orange icon"  height={100} width={100} className="w-[30px] h-[10px]" />
             <h2 className="text-xl font-bold">Services Offered</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2font-medium text-gray-600 pb-5  pl-4">
               {woofer.services!.map((svc, i) => (
                 <Badge key={i} variant="outline" className="badge-profile-woofer text-lg border-none text-gray-500">
                   {svc === "Grooming" && <ScissorsIcon className="mr-1" aria-hidden="true" />}
                   {svc === "DogWalk" && <SparklesIcon className="mr-1" aria-hidden="true" />}
                   {svc === "Training" && <AcademicCapIcon className="mr-1" aria-hidden="true" />}
                   {svc === "Vet" && <IdentificationIcon className="mr-1" aria-hidden="true" />}
                   {svc === "PetSitting" && <HomeIcon className="mr-1" aria-hidden="true" />}

                   {svc}
                 </Badge>
               ))}
             </div>         
             </div>
         </div>
       </TabsContent>
       <TabsContent value="reviews">
        <div className="pt-4">
               <h3 className="text-lg font-medium">Client Reviews</h3>
               <h4 className="text-base text-gray-400">See what pet owners are saying about {woofer.name}</h4>
               <div className="grid grid-cols-1 pt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                 {woofer.reviews?.map((review) => (
                  <div key={review.name} className="w-full bg-white p-4 flex gap-4 rounded-lg border-1 border-gray-20 hover:shadow-lg hover:shadow-gray-200">

                     <Avatar className="h-15 w-14 border-2 border-white shadow-lg">
                        <AvatarImage src={review.profilePic} alt={review.name} />
                        <AvatarFallback>{name?.[0] ?? "W"}</AvatarFallback>
                      </Avatar>
                      <div className="w-full flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h4 className="text-lg font-medium">{review.name}</h4>
                          <p className="font-light text-sm text-gray-400">{review.date}</p>
                        </div>
                        <div className="flex gap-3">
                         <div className="flex items-center">
                           {Array.from({ length: review.rating }).map((_, i) => (
                              <StarIcon key={i} className="h-5 w-5 text-orange-400 fill-orange-400" aria-hidden="true" />
                            ))}
                          </div>
                     
                           <Badge variant="outline" className="text-sm bg-[#fbf8f3]" >
                              {review.pet}
                           </Badge>
                        </div>
                        <p>{review.review}</p>

                      </div>
                  </div>
                 ))}
               </div>

        </div>
       </TabsContent>
       <TabsContent value="gallery">
        <div className="pt-4">
                <h3 className="text-lg font-medium">Pet Gallery </h3>
                <h4 className="text-base text-gray-400">Photos from {woofer.name}&apos;s pet care adventures</h4>

                <Gallery gallery={woofer.gallery!} />

        </div>
       </TabsContent>
     </Tabs>
    </section>

  )
} 