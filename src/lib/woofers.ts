export interface IReview {
  name: string;
  profilePic: string;
  rating: number;
  review: string;
  date: string;
  pet: string;
}

export interface IWoofer {
  uid: string;
  name: string;
  bio: string;
  tags: string[];
  profilePic: string;
  starRating: number;
  numberOfReviews: number;
  avatarUrl?: string,
  services?: string[],
  location?: string,
  badges?:string[]
  bioProfile?: string,
  achievements?:string[],
  reviews?: IReview[],
  gallery?: string[]
}

export const woofers: IWoofer[] = [
   {
    uid: "uid-1",
    name: "Dr. Emily Carter",
    bio: "Board-certified veterinarian with 10 years of experience caring for both small and large animals. Passionate about preventative care and skilled in emergency treatment.",
    tags: ["Vet", "Board Certified", "Empathetic"],
    profilePic: "/woofers/vet.webp",
    starRating: 5,
    numberOfReviews: 120,
  },
  {
    uid: "uid-2",
    name: "Sophia Brown",
    bio: "Expert groomer who makes every pet look their best with gentle, professional care. Loves styling fur and ensuring a relaxing experience for your pet.",
    tags: ["Grooming", "Professional", "Gentle"],
    profilePic: "/woofers/maria.webp",
    starRating: 4.8,
    numberOfReviews: 80,
  },
  {
    uid: "uid-3",
    name: "Michael Thompson",
    bio: "Dedicated dog walker committed to keeping your pet happy and active. Enjoys personalized walks that include plenty of exercise and socialization.",
    tags: ["Dog Walker", "Reliable", "Friendly"],
    profilePic: "/woofers/john.webp",
    starRating: 4.9,
    numberOfReviews: 10
  },
  {
    uid: 'uid-4',
    name: "Olivia Green",
    bio: "Experienced pet sitter who treats your furry family like her own. Available for short or long-term stays, ensuring comfort, care, and fun during your absence.",
    tags: ["Pet Sitter", "Loving", "Trustworthy"],
    profilePic: "/woofers/viviana.jpeg",
    starRating: 5,
    numberOfReviews: 87
  },
  {
    uid: "uid-5",
    name: "Jason Miller",
    bio: "Certified dog trainer with a passion for building strong bonds through positive reinforcement techniques. Focused on creating fun learning experiences for your pet.",
    tags: ["Dog Trainer", "Positive Reinforcement", "Certified"],
    profilePic: "/woofers/pedro.webp",
    starRating: 5,
    numberOfReviews: 120,
  },
  {
    uid:'uid-6',
    name: "Ethan Rodriguez",
    bio: "Innovative dog trainer specializing in agility and advanced obedience. Designs interactive sessions that challenge both the mind and body of your pet.",
    tags: ["Dog Trainer", "Agility", "Interactive"],
    profilePic: "/woofers/paula.webp",
    starRating: 4.9,
    numberOfReviews: 30
  },
]