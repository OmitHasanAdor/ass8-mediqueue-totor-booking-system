"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyBookedSessions = () => {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-booked-sessions?email=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [session]);

  const handleCancel = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      // UI update without refetch
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
     
    </div>
  );
};

export default MyBookedSessions;