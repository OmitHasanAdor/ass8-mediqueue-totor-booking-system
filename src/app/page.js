import AvailableTutors from "@/components/AvailableTutors";
import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <div className="">
    <Banner></Banner>
      <AvailableTutors></AvailableTutors>
  <FeatureSection></FeatureSection>
  <HowItWorks></HowItWorks>
    </div>
  );
}
