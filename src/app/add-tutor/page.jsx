'use client'
import { FieldError, Input, Label, TextField ,Select, ListBox, TextArea, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddTutorsPage = () => {

      const router = useRouter();

    const onSubmit =async(e)=>{
        e.preventDefault()
        const formData= new FormData(e.currentTarget)
        const tutor = Object.fromEntries(formData.entries())
        // console.log(tutor)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`,{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(tutor)
        })
        const data = await res.json()
        if(data){
          toast.success("Tutor added successfully!")
            router.push("/tutors")
        }
        console.log(data)
    }

    return (
         <div className=" max-w-7xl mx-auto mt-5 ">
            <h1 className=" p-5 font-bold text-2xl text-center">Add Tutor</h1>
            <form onSubmit={onSubmit}
            className="p-10 space-y-8 bg-white rounded-2xl shadow-md max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tutor Name */}
              <div className="md:col-span-2">
                <TextField name="tutorName" isRequired>
                  <Label>Tutor Name</Label>
                  <Input placeholder="John Doe" className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

                 {/* Image URL - Removed preview */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
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
              <TextField name="location" isRequired>
                <Label>Location (Area/City)</Label>
                <Input placeholder="Dhaka" className="rounded-2xl" />
                <FieldError />
              </TextField>

              {/* Category - Updated Select Component */}
              <div>
                <Select
                  name="category"
                  isRequired
                  className="w-full"
                  placeholder="Select category"
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
              <TextField name="hourlyFee" type="number" isRequired>
                <Label>Hourly Fee (USD)</Label>
                <Input
                  type="number"
                  placeholder="1299"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
              {/* totalslot */}
              <TextField name="totalSlot" type="number" isRequired>
                <Label>Total Slot</Label>
                <Input
                  type="number"
                  placeholder="20"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Available Days and Times */}
              <TextField name="availableDaysAndTimes" isRequired>
                <Label>Available Days and Times</Label>
                <Input
                  placeholder="Sat-Thu 12-6 PM"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Session Start Date */}
              <div className="md:col-span-2">
                <TextField name="sessionStartDate" type="date" isRequired>
                  <Label>Session Start Date</Label>
                  <Input type="date" className="rounded-2xl" />
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
                  name="category"
                  isRequired
                  className="w-full"
                  placeholder="Select category"
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
                Add Tutor
              {/* {isPending ? "Adding Package..." : "Add Travel Package"} */}
            </Button>
          </form>
        </div>
    );
};

export default AddTutorsPage;