"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import MyBookedSessionsTable from "@/components/MyBookedSessionsTable";
import { toast } from "react-hot-toast";

const MyBookedSessionsClient = () => {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {

    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token()
        console.log('tokenData', tokenData)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-booked-sessions?email=${session.user.email}`, {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          },
        }
        );
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.email]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
        { method: "PATCH" }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Session cancelled successfully!");
        const updatedBookings = bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking
        );
        setBookings(updatedBookings);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel the session.");
    }
  };


  if (!isMounted) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg font-semibold text-gray-500 dark:text-gray-400 animate-pulse">
          Loading page...
        </div>
      </div>
    );
  }

  if (isSessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg font-semibold text-gray-500 dark:text-gray-400 animate-pulse">
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Booked Sessions</h2>

      {loading ? (
        <div className="text-center p-10 text-gray-600 dark:text-gray-400 font-medium">
          Loading your booked sessions...
        </div>
      ) : (
        <MyBookedSessionsTable bookings={bookings} handleCancel={handleCancel} />
      )}
    </div>
  );
};

export default MyBookedSessionsClient;