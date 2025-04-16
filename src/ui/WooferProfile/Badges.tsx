

import Img from 'next/image'

const badges: {title: string, description: string }[]= [
 {
 title: "Pet-Friendly",
 description: "Great with all types of pets, even the shy ones!"
 },
 {
  title: "Certified",
  description: "Professional training and certification in pet care."
 },
 {
   title: "Reliable",
   description: "Consistent service with timely responses."
 }
]

export default function Badges(){
 return (
  <div className='p-10'>
    <div className='w-full flex flex-wrap gap-4 justify-center items-center'>
    {badges.map((badge) => (
      <div key={badge.title}  className={`h-[200px] max-w-[300px] border-1 rounded-xl p-10 gap-4 flex flex-col justify-center items-center 
                  ${badge.title === 'Certified' ? 'bg-blue-50' : badge.title === 'Reliable'  ? 'bg-yellow-50' : 'bg-green-50' }`}  >
          <Img src="/paw-icon.png" alt="paw orange icon"  height={100} width={100} className="w-[40px] h-[38px!important]" />
          <h3 className='text-lg font-medium'>{badge.title}</h3>
          <p className='text-base text-gray-600 text-center'>{badge.description}</p>
      </div>
    ))}

    </div>
  </div>
 )
}