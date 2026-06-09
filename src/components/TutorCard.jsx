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
    <div className="max-w-md w-full dark:bg-black rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 font-sans mx-auto">
      {/* Tutor Image */}
      <div className="w-full h-64 overflow-hidden rounded-2xl p-4 pb-0">
        <Image
          src={imageUrl}
          alt={tutorName}
          className="w-full h-full object-cover rounded-2xl"
          width={400}
          height={300}
          priority
        />
      </div>

      <div className="p-5 pt-3">
       
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">{tutorName}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-800 dark:text-gray-300">
            <FaUniversity className="text-gray-400 shrink-0" />
            <span className="text-sm font-medium">{Institution}</span>
          </div>
        </div>

      
        <div className="space-y-3 my-5 border-t border-b border-gray-50 py-4 text-sm text-gray-600 dark:text-gray-200">
          <div className="flex items-center gap-3">
            <FaClock className="text-gray-400 w-4 shrink-0" />
            <p><span className="font-semibold text-gray-800 dark:text-gray-200">Available:</span> {availableDaysAndTimes}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-gray-400 w-4 shrink-0" />
            <p><span className="font-semibold text-gray-800 dark:text-gray-200">Session Start Date:</span> {formatDate(sessionStartDate)}</p>
          </div>
        </div>

        {/*Booking Action */}
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-500 text-sm font-medium">Fee:</span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-200">৳{hourlyFee}</span>
            <span className="text-gray-500 text-sm">/hr</span>
          </div>

          <Link href={`/tutors/${_id}`} className="block">
            <button className="w-full bg-linear-to-r from-[#4f39f6] to-[#9514fa] hover:from-[#3b27e3] hover:to-[#820ee6] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md">
              Book Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;