
import Hero from "@/ui/Hero";
import WhyWoof from "@/ui/WhyWoof";
import TopWoofers from "@/ui/TopWoofers";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <WhyWoof />
      <TopWoofers />
      <div className="h-screen"></div>
    </div>
  );
}
