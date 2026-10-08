"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const { data } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    if (!sessionId || !user) return;

    const confirmBooking = async () => {
      try {
        // 1. Stripe session verify
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok || !verifyData.success) {
          setStatus("error");
          toast.error(verifyData.error || "Payment verification failed");
          return;
        }

        const { metadata, amount } = verifyData;

        // 2. Booking create
        const { data: tokenData } = await authClient.token();

        const bookingData = {
          userId: user.id,
          userImage: user.image,
          userName: user.name,
          userEmail: user.email,
          tutorId: metadata.tutorId,
          tutorName: metadata.tutorName,
          hourlyFee: amount,
          status: "paid",
          paymentSessionId: sessionId,
        };

        const bookRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (bookRes.ok) {
          setStatus("success");
          toast.success("Session booked successfully!");
        } else {
          setStatus("error");
          toast.error("Payment ok, but booking failed. Contact support.");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        toast.error("Something went wrong");
      }
    };

    confirmBooking();
  }, [sessionId, user]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Verifying payment & creating booking...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>
        <Link href="/tutors" className="btn btn-primary">
          Back to Tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Your tutor session has been booked.
      </p>
      <Link href="/my-booked-sessions" className="btn btn-primary">
        View My Bookings
      </Link>
    </div>
  );
}