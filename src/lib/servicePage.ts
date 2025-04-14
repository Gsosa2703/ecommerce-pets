
import { faker } from '@faker-js/faker'
import { IWoofer } from './woofers'

type ServicesMap = {
    [key: string]: {
        banner: string,
        title: string,
        subtitle: string,
        woofers: IWoofer[]
    }}

const baseBios = {
  grooming: "Expert groomer who ensures pets look their best with gentle care and styling expertise.",
  dogWalk: "Dedicated dog walker providing joyful and safe walks tailored to your pet's needs.",
  training: "Certified trainer helping dogs build confidence and obedience through fun methods.",
  vet: "Experienced veterinarian passionate about preventive health and emergency care.",
  petSitting: "Loving pet sitter offering safe, caring environments for pets while owners are away.",
}

const baseTags = {
  grooming: ["Grooming", "Professional", "Gentle"],
  dogWalk: ["Dog Walker", "Reliable", "Friendly"],
  training: ["Dog Trainer", "Positive Reinforcement", "Certified"],
  vet: ["Vet", "Board Certified", "Empathetic"],
  petSitting: ["Pet Sitter", "Loving", "Trustworthy"],
}

const basePics = [
 "/woofers/maria.webp",
  "/woofers/john.webp",
 "/woofers/pedro.webp",
   "/woofers/vet.webp",
   "/woofers/viviana.jpeg",
]

const generateWoofers = (service: keyof typeof baseBios, count: number): IWoofer[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    bio: baseBios[service],
    tags: baseTags[service],
    profilePic: basePics[Math.floor(Math.random() * basePics.length)],
    starRating: parseFloat((Math.random() * 0.5 + 4.5).toFixed(1)), // Between 4.5 - 5.0
    numberOfReviews: faker.number.int({ min: 20, max: 150 })
  }))
}

export const services: ServicesMap = {
  grooming: { 
    banner: '/services/grooming-service.webp' , 
    woofers: generateWoofers("grooming", 20),
    title: "Find your local groomer",
    subtitle: "Book a 5-star Groomer near you"
  },
  dogwalk: { 
    banner: '/services/walking-service.webp', 
    woofers: generateWoofers("dogWalk", 20),
    title: "Local, trusted dog walkers near you" ,
    subtitle: "Book a 5-star Pet Caregiver near you"
  },
  training: { 
    banner: '/services/training-service.jpg', 
    woofers: generateWoofers("training", 20),
    title: "Dog trainers near you", 
    subtitle: "Find the best dog trainers in your area"
  },
  vet: { 
    banner: '/services/vet-service.jpg', 
    woofers: generateWoofers("vet", 20),
    title: "Local, trusted veterinarians near you",
    subtitle: "Find the best veterinarians in your area" 
  },
  petsitting: { 
    banner: '/services/pet-sitting.jpg', 
    woofers: generateWoofers("petSitting", 20),
    title: "Local, trusted pet sitters near you",
    subtitle: "Book a 5-star Pet Caregiver near you"
  },
}
