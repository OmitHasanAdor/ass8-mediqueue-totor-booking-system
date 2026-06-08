"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FieldError, Select, ListBox, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react"; 
import { CiEdit } from "react-icons/ci";
import { toast } from "react-hot-toast"; 

const EditBooking = ({ tutor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const router = useRouter();

   
    const formatInitialDate = (dateString) => {
        if (!dateString) return "";
        const dateObj = new Date(dateString);
      
        if (isNaN(dateObj.getTime())) return ""; 
        
        const year = dateObj.getFullYear();
     
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const day = String(dateObj.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());

       
        if (tutorData.sessionStartDate) {
            tutorData.sessionStartDate = new Date(tutorData.sessionStartDate);
        }
        tutorData.hourlyFee = Number(tutorData.hourlyFee) || 0;
        tutorData.totalSlot = Number(tutorData.totalSlot) || 0;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${tutor?._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(tutorData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Tutor updated successfully!");              
                setIsOpen(false);              
                router.refresh();
             
                setTimeout(() => {
                    window.location.reload(); 
                }, 100);
            } else {
                toast.error(data?.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update tutor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                <CiEdit className="text-2xl font-bold" />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} scrollBehavior="inside">
                <Modal.Backdrop>
                    <Modal.Container placement="auto" className="max-w-2xl">
                        <Modal.Dialog className="sm:max-w-md dark:bg-zinc-900 border dark:border-zinc-800 rounded-3xl">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading className="dark:text-gray-100">Edit Tutor</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-gray-500 dark:text-gray-400">
                                    Fill out the form below to update tutor profile details.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-4 max-h-[80vh] overflow-y-auto">
                                <Surface variant="default" className="dark:bg-zinc-900 border-0">
                                    <form
                                        onSubmit={onSubmit}
                                        className="p-6 space-y-6 bg-white dark:bg-zinc-900 max-w-3xl mx-auto"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Tutor Name */}
                                            <div className="md:col-span-2">
                                                <TextField name="tutorName" isRequired defaultValue={tutor?.tutorName}>
                                                    <Label>Tutor Name</Label>
                                                    <Input placeholder="John Doe" className="rounded-2xl" />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Image URL */}
                                            <div className="md:col-span-2">
                                                <TextField name="imageUrl" isRequired defaultValue={tutor?.imageUrl}>
                                                    <Label>Image URL</Label>
                                                    <Input type="url" placeholder="https://example.com/tutor.jpg" className="rounded-2xl" />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Location */}
                                            <TextField name="location" isRequired defaultValue={tutor?.location}>
                                                <Label>Location</Label>
                                                <Input placeholder="Dhaka" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>

                                            {/* Category */}
                                            <div>
                                                <Select
                                                    name="subjectCategory"
                                                    isRequired
                                                    className="w-full"
                                                    placeholder="Select category"
                                                    defaultValue={tutor?.subjectCategory}
                                                >
                                                    <Label>Subject/Category</Label>
                                                    <Select.Trigger className="rounded-2xl">
                                                        <Select.Value />
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox>
                                                            <ListBox.Item id="Mathematics" textValue="Mathematics">Mathematics <ListBox.ItemIndicator /></ListBox.Item>
                                                            <ListBox.Item id="Chemistry" textValue="Chemistry">Chemistry <ListBox.ItemIndicator /></ListBox.Item>
                                                            <ListBox.Item id="English" textValue="English">English <ListBox.ItemIndicator /></ListBox.Item>
                                                            <ListBox.Item id="Biology" textValue="Biology">Biology <ListBox.ItemIndicator /></ListBox.Item>
                                                            <ListBox.Item id="Physics" textValue="Physics">Physics <ListBox.ItemIndicator /></ListBox.Item>
                                                            <ListBox.Item id="ICT" textValue="ICT">ICT <ListBox.ItemIndicator /></ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                            </div>

                                            {/* Hourly Fee */}
                                            <TextField name="hourlyFee" type="number" isRequired defaultValue={tutor?.hourlyFee}>
                                                <Label>Hourly Fee (USD)</Label>
                                                <Input type="number" placeholder="12" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>

                                            {/* Total Slot */}
                                            <TextField name="totalSlot" type="number" isRequired defaultValue={tutor?.totalSlot}>
                                                <Label>Total Slot</Label>
                                                <Input type="number" placeholder="20" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>

                                            {/* Available Days and Times */}
                                            <TextField name="availableDaysAndTimes" isRequired defaultValue={tutor?.availableDaysAndTimes}>
                                                <Label>Available Days and Times</Label>
                                                <Input placeholder="Sat-Thu 12-6 PM" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>

                                            {/* Session Start Date */}
                                          
                                            <div className="md:col-span-2">
                                                <TextField 
                                                    name="sessionStartDate" 
                                                    type="date" 
                                                    isRequired 
                                                    defaultValue={formatInitialDate(tutor?.sessionStartDate)}
                                                >
                                                    <Label>Session Start Date</Label>
                                                    <Input type="date" className="rounded-2xl" />
                                                    <FieldError />
                                                </TextField>
                                            </div>

                                            {/* Institution */}
                                            <TextField name="Institution" isRequired defaultValue={tutor?.Institution}>
                                                <Label>Institution </Label>
                                                <Input placeholder="Dhaka University" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>

                                            {/* Experience */}
                                            <div className="md:col-span-2">
                                                <TextField name="experience" isRequired defaultValue={tutor?.experience}>
                                                    <Label>Experience</Label>
                                                    <TextArea placeholder="Describe the experience..." className="rounded-3xl" />
                                                    <FieldError />
                                                </TextField>
                                            </div>
                                        </div>

                                        {/* Teaching Mode */}
                                        <div className="mt-4">
                                            <Select
                                                name="teachingMode"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select mode"
                                                defaultValue={tutor?.teachingMode}
                                            >
                                                <Label>Teaching Mode</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="Online" textValue="Online">Online <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Offline" textValue="Offline">Offline <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Both" textValue="Both">Both <ListBox.ItemIndicator /></ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            disabled={isSubmitting}
                                            className="rounded-xl w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 font-semibold text-white mt-6 transition-colors"
                                        >
                                            {isSubmitting ? "Updating Tutor..." : "Update Tutor"}
                                        </Button>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
};

export default EditBooking;