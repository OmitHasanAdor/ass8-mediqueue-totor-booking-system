import TutorCard from "@/components/TutorCard";


const TutorsPage = async () => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
    const tutors = await res.json()
    // console.log('tutors', tutors)
    return (
        <div>
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

export default TutorsPage;