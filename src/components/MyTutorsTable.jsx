"use client";
import BookingDelete from "@/components/BookingDelete";
import EditBooking from "@/components/EditBooking";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const MyTutorsTable = () => {
  const { data: session } = authClient.useSession();
  const [tutors, setTutors] = useState([]);

useEffect(() => {
  if (!session?.user?.email) return;

  const getTutorsData = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      console.log('tokenData', tokenData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${session?.user?.email}`, 
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          },
        }
      );
      const data = await res.json();
      setTutors(data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  getTutorsData();

}, [session?.user?.email]);
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-md border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      
      <table className="table w-full min-w-max">
        <thead>
          <tr className="text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
            <th className="p-4 text-left font-semibold">Tutor Name</th>
            <th className="p-4 text-left font-semibold">Subject</th>
            <th className="p-4 text-left font-semibold">Available</th>
            <th className="p-4 text-left font-semibold">Hourly Fee</th>
            <th className="p-4 text-left font-semibold">Total Slot</th>
            <th className="p-4 text-left font-semibold">Registration Date</th>
            <th className="p-4 text-left font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700 dark:text-gray-200">
          {tutors?.map((tutor) => (
            <tr key={tutor._id} className="border-b border-gray-50 dark:border-zinc-800/60 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
              <td className="p-4 font-medium whitespace-nowrap">{tutor.tutorName}</td>
              <td className="p-4 whitespace-nowrap">{tutor.subjectCategory}</td>
              <td className="p-4 whitespace-nowrap">{tutor.availableDaysAndTimes}</td>
              <td className="p-4 whitespace-nowrap">${tutor.hourlyFee}</td>
              <td className="p-4 whitespace-nowrap">
                <span className="bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 px-2.5 py-1 rounded-md text-sm font-medium">
                  {tutor.totalSlot}
                </span>
              </td>
              <td className="p-4 whitespace-nowrap">
                {new Date(tutor.sessionStartDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <BookingDelete tutor={tutor} />
                  <EditBooking tutor={tutor} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {tutors.length === 0 && (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          No tutors found.
        </div>
      )}
    </div>
  );
};

export default MyTutorsTable;