import { FiSearch, FiCheckSquare, FiCalendar, FiBookOpen } from 'react-icons/fi';

const HowItWorks = () => {
    const steps = [
        {
            id: "01",
            title: "Search Tutor",
            description: "Find the perfect tutor by subject, institution, or background.",
            icon: <FiSearch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        },
        {
            id: "02",
            title: "Select Slot",
            description: "Choose a convenient date and time from available schedules.",
            icon: <FiCheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        },
        {
            id: "03",
            title: "Book Session",
            description: "Confirm your booking instantly with a simple one-click form.",
            icon: <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        },
        {
            id: "04",
            title: "Start Learning",
            description: "Connect with your tutor and start your interactive session.",
            icon: <FiBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        }
    ];

    return (
        <div>
            <section className="py-16 bg-base-50 px-4 sm:px-8 max-w-7xl mx-auto">
              
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-base-content tracking-tight">
                        How It Works
                    </h2>
                </div>

              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white dark:bg-base-100 border border-base-200 p-8 rounded-2xl transition-all duration-200 ease-in-out hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer flex flex-col items-center text-center"
                        >
                           
                            <div className="flex flex-col items-center gap-2 mb-3">
                                <div className="p-3 bg-blue-50 dark:bg-neutral-800 rounded-xl">
                                    {step.icon}
                                </div>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    Step {step.id}
                                </span>
                            </div>

                           
                            <h3 className="text-lg font-bold text-base-content mb-2">
                                {step.title}
                            </h3>

                           
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;