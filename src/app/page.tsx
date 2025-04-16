
import Hero from "@/ui/Home/Hero";
import WhyWoof from "@/ui/Home/WhyWoof";
import TopWoofers from "@/ui/Home/TopWoofers";
import Testimonals from "@/ui/Home/Testimonials";
import ShelterBanner from "@/ui/Home/ShelterBanner";
import BecomeAWoofer from "@/ui/Home/BecomeAWoofer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <WhyWoof />
      <TopWoofers />
      <Testimonals />
      <BecomeAWoofer />
      <ShelterBanner />
    </div>
  );
}
