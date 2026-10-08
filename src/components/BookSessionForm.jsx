"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BookSessionForm = ({ tutor }) => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    Institution,
    userEmail: tutorEmail,
  } = tutor;

  const currentDate = new Date();
  const sessionDate = new Date(sessionStartDate);
  const isBookingNotAllowed = currentDate > sessionDate;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      // 1. Stripe Checkout Session create
  const res = await fetch("/api/checkout_sessions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tutorId: _id,
    tutorName,
    price: hourlyFee,
    tutorEmail: tutorEmail || "",
  }),
});

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Payment failed");
        return;
      }

      // 2. Stripe page e redirect
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} scrollBehavior="inside">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          disabled={isBookingNotAllowed || totalSlot === 0}
          className={`font-medium transition-all duration-200 ${
            isBookingNotAllowed || totalSlot === 0
              ? "bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed pointer-events-none"
              : "bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white active:scale-98"
          }`}
        >
          {isBookingNotAllowed || totalSlot === 0
            ? "Session Booking Ended"
            : `Book & Pay $${hourlyFee}`}
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md max-h-[90vh] flex flex-col">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Book Session</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Confirm details and pay ${hourlyFee} to book this session.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 overflow-y-auto">
                <Surface variant="default">
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
  {/* Name */}
  <TextField
    className="w-full"
    name="name"
    type="text"
    variant="secondary"
    defaultValue={user?.name || ""}
  >
    <Label>Name</Label>
    <Input placeholder="Enter your name" />
  </TextField>

  {/* Email */}
  <TextField
    className="w-full"
    name="email"
    type="email"
    variant="secondary"
    defaultValue={user?.email || ""}
  >
    <Label>Email</Label>
    <Input placeholder="Enter your email" />
  </TextField>

  {/* Tutor Name - read only */}
  <TextField
    className="w-full"
    name="tutorName"
    type="text"
    variant="secondary"
    defaultValue={tutorName || ""}
    isReadOnly
  >
    <Label>Tutor Name</Label>
    <Input placeholder="Tutor name" />
  </TextField>

  {/* Amount info */}
  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-sm">
    <p>
      <strong>Amount:</strong> ${hourlyFee}
    </p>
    <p className="text-gray-500 mt-1">
      You will be redirected to Stripe for secure payment.
    </p>
  </div>

  <Modal.Footer>
    <Button
      type="button"
      onClick={() => setIsOpen(false)}
      variant="secondary"
      className="text-purple-500"
    >
      Cancel
    </Button>
    <Button
      type="submit"
      disabled={loading}
      className="bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-medium"
    >
      {loading ? "Processing..." : `Pay $${hourlyFee}`}
    </Button>
  </Modal.Footer>
</form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default BookSessionForm;