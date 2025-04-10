
import Link from 'next/link'

export default async function Service(service: { name: string; description: string, slug: string }) {
  return (
    <div className="service-card">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <Link href={`/services/${service.slug}`}>{service.name}</Link>

    </div>
  )
}