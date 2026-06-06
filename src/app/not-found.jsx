import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-base-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          
            <div className="bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-xs tracking-wide">
                Error 404
            </div>

           
            <h1 className="text-4xl sm:text-5xl font-black text-base-content mb-3 tracking-tight">
                Page Not Found
            </h1>

           
            <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-md mb-8 leading-relaxed">
                Oops! The page you are looking for doesn&apos;t exist. It might have been moved, deleted, or the tutor session link is invalid.
            </p>

          
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-medium shadow-md transition-all duration-200 hover:opacity-95"
                >
                    <FiHome className="w-5 h-5" />
                    Back to Home
                </Link>

                <Link
                    href="/tutors"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-base-100 border border-base-300 dark:border-neutral-700 text-base-content font-medium transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                    <FiSearch className="w-5 h-5" />
                    Find Tutors
                </Link>
            </div>
        </div>
    );
};

export default NotFound;