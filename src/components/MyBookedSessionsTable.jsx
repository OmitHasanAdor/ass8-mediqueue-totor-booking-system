"use client";

import Image from 'next/image';

const MyBookedSessionsTable = ({ bookings, handleCancel }) => {
    
    if (!bookings || bookings.length === 0) {
        return (
            <div className="text-center p-15 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-800 text-gray-500 dark:text-gray-400">
                No booked sessions found.
            </div>
        );
    }

    return (
      
        <div className="w-full overflow-x-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
         
            <table className="table w-full min-w-max">
              
                <thead className="bg-gray-100 dark:bg-zinc-800/50 text-gray-700 dark:text-gray-300 text-left border-b border-gray-200 dark:border-zinc-800">
                    <tr>
                        <th className="p-4 font-semibold">#</th>
                        <th className="p-4 font-semibold">Tutor</th>
                        <th className="p-4 font-semibold">Location</th>
                        <th className="p-4 font-semibold">Fee</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 text-center font-semibold">Action</th>
                    </tr>
                </thead>

              
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 text-gray-700 dark:text-gray-200">
                    {bookings.map((booking, index) => (
                        <tr key={booking._id || index} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="p-4 font-medium text-gray-500 dark:text-gray-400">{index + 1}</td>

                         
                            <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    {booking.imageUrl ? (
                                        <Image
                                            width={44}
                                            height={44}
                                            src={booking.imageUrl}
                                            alt={booking.tutorName || "Tutor"}
                                            className="w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
                                        />
                                    ) : (
                                        <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                                            {booking.tutorName?.charAt(0) || "T"}
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                            {booking.tutorName || "Unknown Tutor"}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {booking.Institution || "Not specified"}
                                        </p>
                                    </div>
                                </div>
                            </td>

                         
                            <td className="p-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{booking.location}</td>
                            <td className="p-4 font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">${booking.hourlyFee}</td>

                            <td className="p-4 whitespace-nowrap">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                        booking.status === "confirmed"
                                            ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                                    }`}
                                >
                                    {booking.status}
                                </span>
                            </td>

                            <td className="p-4 text-center whitespace-nowrap">
                                <button
                                    onClick={() => handleCancel(booking._id)}
                                    disabled={booking.status === "cancelled"}
                                    title={booking.status === "cancelled" ? "Already Cancelled" : "Cancel Session"}
                                    className={`text-xl transition-colors duration-200 p-2 ${
                                        booking.status === "cancelled"
                                            ? "text-gray-300 dark:text-zinc-700 cursor-not-allowed"
                                            : "text-red-500 hover:text-red-700 font-bold"
                                    }`}
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookedSessionsTable;