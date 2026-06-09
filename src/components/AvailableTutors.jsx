import TutorCard from "./TutorCard";


const AvailableTutors = async () => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/available-tutors`);
    const tutors = await res.json()
    console.log('tutors', tutors)
    return (
        <div>
            <div className=" max-w-7xl mx-auto">

            <h2 className="text-2xl font-bold mb-4">Available Tutors</h2>

            </div>
         <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 mx-auto max-w-7xl">
                {
                    tutors.map(tutor=>{
                        return <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                    })
                }
            </div>
        </div>
    );
};

export default AvailableTutors;