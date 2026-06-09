import TutorCard from "@/components/TutorCard";
import FilterBar from "@/components/FilterBar"; 

export const metadata = {
  title: "Tutors - MediQueue",
  description: "Browse our list of expert tutors available for personalized learning sessions.",
};


async function getTutors(searchParams) {
  const search = searchParams?.search || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";


  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?${queryParams.toString()}`,
    { cache: "no-store" } 
  );

  if (!res.ok) return [];
  return res.json();
}

const TutorsPage = async ({ searchParams }) => {

  const resolvedSearchParams = await searchParams;
  const tutors = await getTutors(resolvedSearchParams);

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center  mb-10">
          All Tutors
        </h1>

      
        <FilterBar 
          currentSearch={resolvedSearchParams?.search || ""} 
          currentStartDate={resolvedSearchParams?.startDate || ""}
          currentEndDate={resolvedSearchParams?.endDate || ""}
        />

       
        {tutors.length === 0 ? (
          <div className="text-center p-12 text-gray-500 text-lg">
            No tutors found matching the criteria!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorsPage;