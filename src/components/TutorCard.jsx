'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUniversity,
} from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
  const {
    tutorName,
    imageUrl,
    _id,
    sessionStartDate,
    availableDaysAndTimes,
    hourlyFee,
    Institution
  } = tutor;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Available";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="group max-w-md w-full bg-white dark:bg-black rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 font-sans mx-auto">
      
      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={imageUrl}
          alt={tutorName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
        {/* Fee badge overlay */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">৳{hourlyFee}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">/hr</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">

        {/* Name + Institution */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {tutorName}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5 text-gray-500 dark:text-gray-400">
            <FaUniversity className="shrink-0 text-xs" />
            <span className="text-sm truncate">{Institution}</span>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-2.5 bg-gray-50 dark:bg-gray-900/40 rounded-2xl p-4 text-sm">
          <div className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300">
            <FaClock className="text-gray-400 w-4 mt-0.5 shrink-0" />
            <p>
              <span className="font-semibold text-gray-900 dark:text-gray-100 block">Available</span>
              {availableDaysAndTimes}
            </p>
          </div>

          <div className="flex items-start gap-2.5 text-gray-700 dark:text-gray-300 pt-2.5 border-t border-gray-200 dark:border-gray-800">
            <FaCalendarAlt className="text-gray-400 w-4 mt-0.5 shrink-0" />
            <p>
              <span className="font-semibold text-gray-900 dark:text-gray-100 block">Session Starts</span>
              {formatDate(sessionStartDate)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/tutors/${_id}`} className="block">
          <button className="w-full bg-linear-to-r from-[#4f39f6] to-[#9514fa] hover:from-[#3b27e3] hover:to-[#820ee6] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md">
            Book Session
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;