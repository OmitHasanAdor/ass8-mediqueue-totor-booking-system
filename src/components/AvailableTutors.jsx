import TutorCard from "./TutorCard";

const AvailableTutors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/available-tutors`);
    const tutors = await res.json();

    return (
        <section className="max-w-7xl mx-auto px-5 py-10">

            {/* Section header */}
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Available Tutors
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
                    Browse verified tutors and book a session that fits your schedule
                </p>
            </div>

            {/* Tutors grid */}
            {tutors?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor._id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-medium">No tutors available right now</p>
                    <p className="text-sm mt-1">Please check back later</p>
                </div>
            )}
        </section>
    );
};

export default AvailableTutors;