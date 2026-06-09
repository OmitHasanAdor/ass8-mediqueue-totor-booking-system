"use client";
import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddTutorsForm = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());

    const tutorData = {
      ...tutor,
      userEmail: session?.user?.email,
    };


     const {data:tokenData}= await authClient.token()
    console.log('tokenData',tokenData)
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
         authorization: `Bearer ${tokenData?.token}`
        
      },
      body: JSON.stringify(tutorData)
    });
    
    const data = await res.json();
    if (data) {
      toast.success("Tutor added successfully!");
      router.push("/tutors");
    }
    console.log(data);
  };

  return (
    <form onSubmit={onSubmit} className="p-10 space-y-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-md max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tutor Name */}
        <div className="md:col-span-2">
          <TextField name="tutorName" isRequired>
            <Label>Tutor Name</Label>
            <Input placeholder="John Doe" className="rounded-2xl" />
            <FieldError />
          </TextField>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <TextField name="imageUrl" isRequired>
            <Label>Image URL</Label>
            <Input type="url" placeholder="https://example.com/tutor.jpg" className="rounded-2xl" />
            <FieldError />
          </TextField>
        </div>

        {/* Location */}
        <TextField name="location" isRequired>
          <Label>Location (Area/City)</Label>
          <Input placeholder="Dhaka" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Category */}
        <div>
          <Select name="subjectCategory" isRequired className="w-full" placeholder="Select category">
            <Label>Subject/Category</Label>
            <Select.Trigger className="rounded-2xl">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="Mathematics" textValue="Mathematics">Mathematics<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="Chemistry" textValue="Chemistry">Chemistry<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="English" textValue="English">English<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="Biology" textValue="Biology">Biology<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="Physics" textValue="Physics">Physics<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="ICT" textValue="ICT">ICT<ListBox.ItemIndicator /></ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Hourly Fee */}
        <TextField name="hourlyFee" type="number" isRequired>
          <Label>Hourly Fee (USD)</Label>
          <Input type="number" placeholder="1299" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Total Slot */}
        <TextField name="totalSlot" type="number" isRequired>
          <Label>Total Slot</Label>
          <Input type="number" placeholder="20" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Available Days and Times */}
        <TextField name="availableDaysAndTimes" isRequired>
          <Label>Available Days and Times</Label>
          <Input placeholder="Sat-Thu 12-6 PM" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Session Start Date */}
        <div className="md:col-span-2">
          <TextField name="sessionStartDate" type="date" isRequired>
            <Label>Session Start Date</Label>
            <Input type="date" className="rounded-2xl dark:text-gray-200 " />
            <FieldError />
          </TextField>
        </div>

        {/* Institution */}
        <TextField name="Institution" isRequired>
          <Label>Institution </Label>
          <Input placeholder="Dhaka University" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Experience */}
        <div className="md:col-span-2">
          <TextField name="experience" isRequired>
            <Label>Experience</Label>
            <TextArea placeholder="I have 5 years of experience teaching" className="rounded-3xl" />
            <FieldError />
          </TextField>
        </div>
      </div>

      {/* Teaching Mode */}
      <div>
        <Select name="teachingMode" isRequired className="w-full" placeholder="Select category">
          <Label>Teaching Mode</Label>
          <Select.Trigger className="rounded-2xl">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="Online" textValue="Online">Online<ListBox.ItemIndicator /></ListBox.Item>
              <ListBox.Item id="Offline" textValue="Offline">Offline<ListBox.ItemIndicator /></ListBox.Item>
              <ListBox.Item id="Both" textValue="Both">Both<ListBox.ItemIndicator /></ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="outline" className="rounded-none w-full bg-linear-to-r  from-[#4f39f6] to-[#9514fa] text-white">
        Add Tutor
      </Button>
    </form>
  );
};

export default AddTutorsForm;