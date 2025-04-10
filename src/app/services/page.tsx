import { services } from '@/lib/services'
import Service from '@/ui/Service'
 
export default async function Page() {
  return (
    <ul>
      {services.map((service) => (
        <Service key={service.name} name={service.name} description={service.description} slug={service.slug} />
      ))}
    </ul>
  )
}