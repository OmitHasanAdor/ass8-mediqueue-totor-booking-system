'use client';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBriefcase,
  FaUniversity,
  FaUserFriends
} from 'react-icons/fa';

const TutorCard = ({ tutor }) => {

  const {
    tutorName,
    imageUrl,
    location,
    _id,
    sessionStartDate,
    availableDaysAndTimes,
    totalSlot,
    hourlyFee,
    experience,
    Institution
  } = tutor;

  return (
    <div className="max-w-md bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100  font-sans">

      {/* Tutor Image */}
      <div className="w-full h-64 overflow-hidden rounded-2xl mb-5">
        <Image
          src={imageUrl}
          alt={tutorName}
          className="w-full h-full"
          width={400}
          height={300}
        />
      </div>

      <div className=" p-4">
        {/* Tutor Header Info */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{tutorName}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <FaUniversity className="text-purple-600 shrink-0" />
            <span className="text-sm font-medium">{Institution}</span>
          </div>
        </div>

        {/* Tutor Detailed Specs */}
        <div className="space-y-3 my-5 border-t border-b border-gray-50 py-4 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-gray-400 w-4" />
            <p><span className="font-semibold text-gray-800">Location:</span> {location}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaBriefcase className="text-gray-400 w-4" />
            <p><span className="font-semibold text-gray-800">Experience:</span> {experience}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-gray-400 w-4" />
            <p><span className="font-semibold text-gray-800">Available:</span> {availableDaysAndTimes}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-gray-400 w-4" />
            <p><span className="font-semibold text-gray-800">Session Start Date:</span> {sessionStartDate}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaUserFriends className="text-gray-400 w-4" />
            <p><span className="font-semibold text-gray-800">Total Slots Available:</span> {totalSlot}</p>
          </div>
        </div>

        {/* Pricing & Booking Action */}
        <div className="space-y-4 pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-500 text-sm font-medium">Fee:</span>
            <span className="text-2xl font-extrabold text-gray-900">৳{hourlyFee}</span>
            <span className="text-gray-500 text-sm">/hr</span>
          </div>

          <button

            className="w-full  bg-linear-to-r  from-[#4f39f6] to-[#9514fa] hover:bg-[#9514fa] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md shadow-teal-600/10"
          >
            Book Session
          </button>
        </div>
      </div>

    </div>
  );
};

export default TutorCard;