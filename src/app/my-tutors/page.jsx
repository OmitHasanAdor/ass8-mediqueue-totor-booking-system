"use client";

import BookingDelete from "@/components/BookingDelete";
import EditBooking from "@/components/EditBooking";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const MyTutorsPage = () => {
  const { data: session } = authClient.useSession();

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setTutors(data));
  }, [session]);

  return (
    <div className="max-w-7xl mx-auto py-10">
     <div className="overflow-x-auto bg-white rounded-3xl shadow-md border border-gray-100">
  <table className="table">
    <thead>
      <tr className="text-gray-600">
        <th>Tutor Name</th>
        <th>Subject</th>
        <th>Available</th>
        <th>Hourly Fee</th>
        <th>Total Slot</th>
        <th>Registration Date</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {tutors?.map((tutor) => (
        <tr key={tutor._id}>
          <td className="font-medium">
            {tutor.tutorName}
          </td>

          <td>{tutor.category}</td>

          <td>{tutor.availableDaysAndTimes}</td>

          <td>${tutor.hourlyFee}</td>

          <td>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm">
              {tutor.totalSlot}
            </span>
          </td>

          <td>
            {new Date(
              tutor.sessionStartDate
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </td>

          <td>
            <div className="flex items-center gap-3">
             <BookingDelete tutor={tutor}></BookingDelete>

            <EditBooking tutor={tutor}></EditBooking>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default MyTutorsPage;