
import { faker } from '@faker-js/faker'
import { IWoofer } from './woofers'
export type ServiceType = {
  banner: string,
  title: string,
  subtitle: string,
  woofers: IWoofer[]
}

export type ServicesMap = {
    [key: string]: ServiceType
  }

    
export interface IReview {
  name: string;
  profilePic: string;
  rating: number;
  review: string;
  date: string;
  pet: string;
}

  
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

const baseDates = [
  "about an hour ago",
   "about a day ago",
  "about a year ago",
  "about a month ago",
 ]

 const booleans = [true, false]


export function feedLocalStorge (){

const generateWoofers = (service: keyof typeof baseBios, count: number): IWoofer[] => {
  return Array.from({ length: count }).map(() => ({
    uid: faker.string.uuid(),
    name: faker.person.fullName(),
    bio: baseBios[service],
    tags: baseTags[service],
    profilePic: basePics[Math.floor(Math.random() * basePics.length)],
    starRating: parseFloat((Math.random() * 0.5 + 4.5).toFixed(1)), // Between 4.5 - 5.0
    numberOfReviews: faker.number.int({ min: 20, max: 150 }),
    avatarUrl: faker.image.avatar(),
    services: [service.charAt(0).toUpperCase() + service.slice(1)],
    location: `${faker.location.city()}, ${faker.location.state()}`,
    badges: [
      "Under 1 hour response", '1km near you',
      "5+ years experience",],
    achievements: [
      "Certified Professional Pet Groomer",
      "Top Rated", "Featured in Best Pet Services 2023",
      "Background Checked", "Pet First Aid Certified",
    ],
    bioProfile: `Hi there! I'm ${faker.person.fullName()}, a certified pet groomer and trainer with over 5 years of experience. I absolutely adore animals and treat each pet like my own. Whether your furry friend needs a stylish trim, a relaxing bath, or some behavior training, I'm here to help! I specialize in working with dogs of all sizes and temperaments, and I'm known for making even the most nervous pets feel comfortable.`,
    reviews: Array.from({ length: 4 }).map(() => ({
      name: faker.person.fullName(),
      profilePic: faker.image.avatar(),
      rating: faker.number.int({ min: 3, max: 5 }),
      review: faker.lorem.sentence(20),
      date: baseDates[faker.number.int({ min: 0, max: baseDates.length -1 })],
      pet: faker.animal.dog(),
    })),
    gallery: [
      "/gallery/pet1.jpg",
      "/gallery/2.webp",
      "/gallery/3.jpeg",
      "/gallery/3.webp",
      "/gallery/4.webp",
    ],
    isVerified: booleans[faker.number.int({ min: 0, max: booleans.length -1 })] 
  }))
}


const groomingWoofers = generateWoofers("grooming", 20)
const dogWalkWoofers = generateWoofers("dogWalk", 20)
const trainingWoofers = generateWoofers("training", 20)
const vetWoofers = generateWoofers("vet", 20)
const petSittingWoofers = generateWoofers("petSitting", 20)

const services: ServicesMap = {
  grooming: { 
    banner: '/services/grooming-service.webp' , 
    woofers: groomingWoofers,
    title: "Find your local groomer",
    subtitle: "Book a 5-star Groomer near you"
  },
  dogwalk: { 
    banner: '/services/walking-service.webp', 
    woofers: dogWalkWoofers,
    title: "Local, trusted dog walkers near you" ,
    subtitle: "Book a 5-star Pet Caregiver near you"
  },
  training: { 
    banner: '/services/training-service.jpg', 
    woofers: trainingWoofers,
    title: "Dog trainers near you", 
    subtitle: "Find the best dog trainers in your area"
  },
  vet: { 
    banner: '/services/vet-service.jpg', 
    woofers: vetWoofers,
    title: "Local, trusted veterinarians near you",
    subtitle: "Find the best veterinarians in your area" 
  },
  petsitting: { 
    banner: '/services/pet-sitting.jpg', 
    woofers: petSittingWoofers,
    title: "Local, trusted pet sitters near you",
    subtitle: "Book a 5-star Pet Caregiver near you"
  },
}

const allWoofers = [ 
  ...groomingWoofers,
  ...dogWalkWoofers,
  ...trainingWoofers,
  ...vetWoofers,
  ...petSittingWoofers
]

type Woofers = {
  [key: string]: IWoofer
}

const mappedWoofers: Woofers = {}

allWoofers.map((woofer) => {
  mappedWoofers[woofer['uid']] = woofer
  return
})

if (typeof window !== "undefined") {
  console.log('entra aqui')
  window.localStorage.setItem('woofers', JSON.stringify(mappedWoofers))
  window.localStorage.setItem('services', JSON.stringify(services))
}

}
