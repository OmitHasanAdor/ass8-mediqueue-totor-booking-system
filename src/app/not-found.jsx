import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      
      <div className="max-w-lg w-full">
        {/* Error Badge */}
        <div className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold px-5 py-1.5 rounded-full text-sm mb-6 shadow-sm tracking-wide">
          Error 404
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-gray-800 dark:text-white mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-base max-w-md mx-auto mb-10 leading-relaxed">
          Oops! The page you are looking for doesn&apos;t exist. It might have been moved, deleted, or the tutor session link is invalid.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-medium shadow-md hover:opacity-90 transition-opacity"
          >
            <FiHome className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/tutors"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSearch className="w-5 h-5" />
            Find Tutors
          </Link>
        </div>
      </div>
    </div>
  );
}