import Image from 'next/image';
import { useState } from 'react';

const MyBookedSessionsTable = () => {
    const [bookings, setBookings] = useState([]);

    const handleCancel = async (id) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            const updatedBookings = bookings.map((booking) =>
                booking._id === id
                    ? { ...booking, status: "cancelled" }
                    : booking
            );

            setBookings(updatedBookings);
        }
    };
    return (
        <div>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="table">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Tutor</th>
                            <th>Location</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            width={40}
                                            height={40}
                                            src={booking.imageUrl}
                                            alt={booking.tutorName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold">
                                                {booking.tutorName}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {booking.Institution}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td>{booking.location}</td>

                                <td>${booking.hourlyFee}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        disabled={booking.status === "cancelled"}
                                        className={`text-xl ${booking.status === "cancelled"
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-red-500 hover:text-red-700"
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
        </div>
    );
};

export default MyBookedSessionsTable;