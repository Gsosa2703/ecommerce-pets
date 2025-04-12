
import Hero from "@/ui/Hero";
import WhyWoof from "@/ui/WhyWoof";
import TopWoofers from "@/ui/TopWoofers";
import Testimonals from "@/ui/Testimonials";
import ShelterBanner from "@/ui/ShelterBanner";
import BecomeAWoofer from "@/ui/BecomeAWoofer";

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
