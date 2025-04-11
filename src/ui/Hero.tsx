
import HeroSlider from './HeroSlider'

export default function Hero() {

  return (
    <header className="w-full relative">

      {/* Video Background */}
      <div className="h-150">
        <video
          className="object-cover w-full h-full"
          src="/video-hero.mp4"  // Replace with your video path (e.g., in public folder)
          autoPlay
          loop
          muted
          playsInline
          poster="/path/to/fallback.jpg"  // Optional: fallback image if video fails to load
        />
      </div>

      <div className="absolute inset-x-0 top-100  w-full z-50">
         <HeroSlider />
      </div>


    </header>
   )

}