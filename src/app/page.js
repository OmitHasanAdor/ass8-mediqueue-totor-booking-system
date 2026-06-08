import AvailableTutors from "@/components/AvailableTutors";
import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


export const metadata = {
  title: "Home - MediQueue",
  description: "Learn more about our Mediqueue platform, connecting students with expert tutors for personalized learning. Discover how we facilitate seamless tutoring sessions and enhance your educational journey.",
};

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <Link href="/tutors" className="flex justify-center mt-10">
        <h2 className="text-xl max-w-50 text-white font-bold text-center flex items-center gap-2 p-4 rounded-2xl  bg-linear-to-r shadow-sm  from-[#4f39f6] to-[#9514fa]">See All Tutors <FaArrowRight /></h2>
      </Link>
      <AvailableTutors></AvailableTutors>
      <FeatureSection></FeatureSection>
      <HowItWorks></HowItWorks>
    </div>
  );
}
