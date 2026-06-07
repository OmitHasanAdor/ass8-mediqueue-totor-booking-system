"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FieldError, Select, ListBox, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";

const EditBooking = ({ tutor }) => {

    const route = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
    const tutorData = Object.fromEntries(formData.entries())
      
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${tutor._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(tutorData)
        })
        const data = await res.json()
        // redirect("/destination")
        route.refresh();

        console.log(data)
    }

    return (
        <Modal>
            <Button variant="primary" className={' text-green-500 hover:text-green-800 border-2 border-green-500 hover:border-green-800  '}><CiEdit /></Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>

                            <Modal.Heading>Edit Tutor</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we will get back to you as soon as possible.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit}
                                    className="p-10 space-y-8 bg-white rounded-2xl shadow-md max-w-3xl mx-auto"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Tutor Name */}
                                        <div className="md:col-span-2">
                                            <TextField name="tutorName" isRequired
                                                defaultValue={tutor?.tutorName}>
                                                <Label>Tutor Name</Label>
                                                <Input placeholder="John Doe" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL - Removed preview */}
                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl" isRequired
                                                defaultValue={tutor?.imageUrl}>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/bali-paradise.jpg"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Location */}
                                        <TextField name="location" isRequired
                                            defaultValue={tutor?.location}>
                                            <Label>Location (Area/City)</Label>
                                            <Input placeholder="Dhaka" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Category - Updated Select Component */}
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
                                                        <ListBox.Item id="Mathematics" textValue="Mathematics">
                                                            Mathematics
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Chemistry" textValue="Chemistry">
                                                            Chemistry
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="English" textValue="English">
                                                            English
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Biology" textValue="Biology">
                                                            Biology
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Physics" textValue="Physics">
                                                            Physics
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="ICT" textValue="ICT">
                                                            ICT
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* hourlyfee */}
                                        <TextField name="hourlyFee" type="number" isRequired
                                            defaultValue={tutor?.hourlyFee}
                                        >
                                            <Label>Hourly Fee (USD)</Label>
                                            <Input
                                                type="number"
                                                placeholder="1299"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>
                                        {/* totalslot */}
                                        <TextField name="totalSlot" type="number" isRequired
                                            defaultValue={tutor?.totalSlot}>
                                            <Label>Total Slot</Label>
                                            <Input
                                                type="number"
                                                placeholder="20"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Available Days and Times */}
                                        <TextField name="availableDaysAndTimes" isRequired
                                            defaultValue={tutor?.availableDaysAndTimes}>
                                            <Label>Available Days and Times</Label>
                                            <Input
                                                placeholder="Sat-Thu 12-6 PM"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Session Start Date */}
                                        <div className="md:col-span-2">
                                            <TextField name="sessionStartDate" type="date" isRequired
                                                defaultValue={tutor?.sessionStartDate}>
                                                <Label>Session Start Date</Label>
                                                <Input type="date" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Institution */}
                                        <TextField name="Institution" isRequired
                                            defaultValue={tutor?.Institution}>
                                            <Label>Institution </Label>
                                            <Input placeholder="Dhaka University" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>



                                        {/* Experience */}
                                        <div className="md:col-span-2">
                                            <TextField name="experience" isRequired
                                                defaultValue={tutor?.experience}>
                                                <Label>Experience</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>
                                    {/* Category - Updated Select Component */}
                                    <div>
                                        <Select
                                            name="teachingMode"
                                            isRequired
                                            className="w-full"
                                            placeholder="Select category"
                                            defaultValue={tutor?.teachingMode}
                                        >
                                            <Label>Teaching Mode</Label>
                                            <Select.Trigger className="rounded-2xl">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover>
                                                <ListBox>
                                                    <ListBox.Item id="Online" textValue="Online">
                                                        Online
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Offline" textValue="Offline">
                                                        Offline
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item id="Both" textValue="Both">
                                                        Both
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>

                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    {/* Buttons */}

                                    <Button
                                        type="submit"
                                        variant="outline"
                                        //   isLoading={isPending}
                                        className=" rounded-none w-full bg-cyan-500 text-white"
                                    >
                                        Edit Tutor
                                        {/* {isPending ? "Adding Package..." : "Add Travel Package"} */}
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditBooking;