import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { IoCalendarOutline, IoFlashOutline } from 'react-icons/io5';
import { MdOutlinePriceChange } from 'react-icons/md';

const FeatureSection = () => {

    const features = [
        {
            id: 1,
            title: "Easy Booking",
            description: "Book tutors instantly with a smooth and simple interface.",
            icon: <IoFlashOutline className="w-7 h-7 text-[#4f39f6]" />
        },
        {
            id: 2,
            title: "Verified Tutors",
            description: "All tutors are verified to ensure quality education.",
            icon: <HiOutlineBadgeCheck className="w-7 h-7 text-[#9514fa]" />
        },
        {
            id: 3,
            title: "Flexible Scheduling",
            description: "Choose time slots that fit your daily routine.",
            icon: <IoCalendarOutline className="w-7 h-7 text-[#4f39f6]" />
        },
        {
            id: 4,
            title: "Affordable Pricing",
            description: "Find tutors that match your budget easily.",
            icon: <MdOutlinePriceChange className="w-7 h-7 text-[#9514fa]" />
        }
    ];

    return (
        <div>
            <section className="py-16 bg-base-50 px-4 sm:px-8 max-w-7xl mx-auto">
               
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                        Why Choose <span className="bg-linear-to-r from-[#4f39f6] to-[#9514fa] bg-clip-text text-transparent">MediQueue</span>?
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-[#4f39f6] to-[#9514fa] mx-auto mt-3 rounded-full"></div>
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white dark:bg-base-100 border border-base-200 p-8 rounded-2xl transition-all duration-200 ease-in-out hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer flex flex-col items-center text-center"
                        >
                           
                            <div className="mb-4 p-3 bg-base-100 rounded-xl">
                                {feature.icon}
                            </div>

                           
                            <h3 className="text-xl font-bold text-base-content mb-2">
                                {feature.title}
                            </h3>

                         
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FeatureSection;