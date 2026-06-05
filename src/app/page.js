import AvailableTutors from "@/components/AvailableTutors";
import Banner from "@/components/Banner";


export default function Home() {
  return (
    <div className="">
    <div>
    <Banner></Banner>
    </div>
    <div className="">
      <AvailableTutors></AvailableTutors>
    </div>
    </div>
  );
}
