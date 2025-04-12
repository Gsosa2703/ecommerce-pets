
import TopWoofersSlider from "./TopWoofersSlider"

export default function TopWoofers() {
  return (
    <section className="w-full flex flex-col items-center pt-10 overflow-hidden">
      <h1 className="text-5xl font-bold text-orange-400">Meet our top-rated Woofers</h1>
      <p className="pt-10 font-medium text-gray-400 text-2xl text-center">We have over 100,000 experienced Woofers – all rated, reviewed and verified.</p>
      <TopWoofersSlider />
    </section>
   )
}