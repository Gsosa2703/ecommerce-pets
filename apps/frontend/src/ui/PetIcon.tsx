import Link from 'next/link'
import Image from 'next/image'


export default function PetIcon(petIcon: { name: string; imageUrl: string, slug: string }) {
  return (
   <Link href={`/services/${petIcon.slug}`}>
    <div className="flex flex-col items-center">
      <Image src={petIcon.imageUrl} alt={petIcon.slug} width={100} height={100} />
      <p className="whitespace-nowrap font-medium text-gray-800 hover:text-gray-900">{petIcon.name}</p>
    </div>
    </Link>
  )
}