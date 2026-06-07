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
    // const [slot, setSlot] = useState(tutor?.totalSlot);

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


    const currentDate = new Date();
    const sessionDate = new Date(sessionStartDate);
    const isBookingNotAllowed = currentDate > sessionDate;
    console.log(sessionStartDate, currentDate, isBookingNotAllowed);


    const onSubmit = async (e) => {
        e.preventDefault();
        
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            tutorId: _id,
            tutorName,
            hourlyFee,
            experience,
            Institution,
            imageUrl,
            sessionStartDate,
            availableDaysAndTimes,
            location,
            status: "confirmed",
        };

        
    const BookedData = {
      ...tutor,
      tutorEmail: session?.user?.email,
    };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(BookedData)
            });

            if (res.ok) {
                toast.success("Session booked successfully!");
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            // console.error("Booking error:", error);
            toast.error("Failed to book session.");
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
                    ? 'bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed pointer-events-none' 
                    : 'bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white active:scale-98'
                }`}
                >
                  {isBookingNotAllowed || totalSlot === 0 ? "Session Booking Ended" : "Book Session"}
                </Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md max-h-[90vh] flex flex-col">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Book Session</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Please fill out the form below to book a session with the tutor.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-6 overflow-y-auto">
                                <Surface variant="default">
                                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                                        {/* name */}
                                        <TextField className="w-full" name="name" type="text" variant="secondary">
                                            <Label>Name</Label>
                                            <Input placeholder="Enter your name" />
                                        </TextField>
                                        {/* Phone */}
                                        <TextField className="w-full" name="phone" type="tel" variant="secondary">
                                            <Label>Phone</Label>
                                            <Input placeholder="Enter your phone number" />
                                        </TextField>

                                        {/* tutor name  */}
                                        <TextField className="w-full" name="tutorName" type="text" variant="secondary" defaultValue={tutorName || ""}>
                                            <Label>Tutor Name</Label>
                                            <Input placeholder="Enter tutor's name" />
                                        </TextField>

                                        {/* Email */}
                                        <TextField className="w-full" name="email" type="email" variant="secondary" defaultValue={user?.email || ""}>
                                            <Label>Email</Label>
                                            <Input placeholder="Enter your email" />
                                        </TextField>

                                        {/* id  */}
                                        <TextField className="w-full" name="tutorId" type="text" variant="secondary" defaultValue={_id || ""}>
                                            <Label>Tutor ID</Label>
                                            <Input placeholder="Enter tutor's ID" />
                                        </TextField>

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
                                                className='bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-medium'
                                            >
                                                Book Session
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