import BookSessionForm from "@/components/BookSessionForm";
import Image from "next/image";


export async function generateMetadata({ params }) {
   const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`
  );
  const tutor = await res.json();

  return {
    title: tutor.tutorName,
    description: tutor.experience,
  };
}



const TutorsDetailPage = async ({ params }) => {

  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
    headers: {
      // authorization: `Bearer ${token}`
    }
  });

  const tutor = await res.json();

  const {
    tutorName,
    imageUrl,
    location,
    _id,
    sessionStartDate,
    availableDaysAndTimes,
    totalSlot,
    hourlyFee,
    experience,
    Institution
  } = tutor;

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">


        <div className="w-full md:w-1/2">
          <Image
            width={400}
            height={300}
            src={imageUrl}
            alt={tutorName}
            className="w-full h-auto rounded-xl object-cover shadow-sm"
          />
        </div>


        <div className="w-full md:w-1/2 space-y-4 my-auto text-gray-800">
          <div>
            <h2 className="text-3xl font-bold text-black mb-1">{tutorName}</h2>
            <p className="text-gray-500 italic mb-4">Mathematics</p>
          </div>

          <div className="space-y-2 text-sm md:text-base">
            <p><strong>Institution:</strong> {Institution}</p>
            <p><strong>Experience:</strong> {experience}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Mode:</strong> Online</p>
            <p><strong>Available & Time Slot:</strong> {availableDaysAndTimes}</p>
            <p><strong>Hourly Fee:</strong> ${hourlyFee}/hr</p>

            {totalSlot === 0 ?
              <p>
                no remaining slots
              </p>
              : <p><strong>Remaining Slots:</strong> {totalSlot}</p>
            }
            <p><strong>Session Start Date:</strong> {sessionStartDate}</p>
          </div>

          <div className="pt-4">
            {/* <button className="px-6 py-2 border bg-linear-to-r  from-[#4f39f6] to-[#9514fa] rounded-md hover:bg-[#9514fa] text-white transition-colors duration-200 text-sm font-medium">
            Book Session
          </button> */}
            <BookSessionForm tutor={tutor} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutorsDetailPage;