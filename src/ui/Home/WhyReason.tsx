import Image from 'next/image'


export default function WhyReason(reason: { title: string; description: string, imageUrl: string }) {
 return (
   <section className="flex flex-col md:flex-row items-center gap-5 md:gap-10 py-5">
     <Image src={reason.imageUrl} alt={reason.title} width={100} height={100} className='w-[150px]'/>
     <div>
       <Image src='/whywoof/separador-patita.svg' width={20} height={100} alt='separador-patita' className='hidden md:block xl:w-[45px] md:w-[30px]'/>
     </div>
     <div className='sm:px-8 md:w-[532px]'>
       <h2 className='text-3xl leading-20 text-gray-500 font-bold leading-[40px!important] pb-5 md:pb-0'>{reason.title}</h2>
       <p className='text-xl text-gray-500'>{reason.description}</p>
     </div>
   </section>
  )
}