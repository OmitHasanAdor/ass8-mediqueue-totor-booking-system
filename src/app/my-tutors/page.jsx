import MyTutorsTable from "@/components/MyTutorsTable";

export const metadata = {
  title: "My Tutors | MediQueue",
  description: "View and manage the tutors you have added, track slots, fees, and booking updates.",
};

const MyTutorsPage = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-10">
      <h1 className="p-5 font-bold text-2xl text-center text-foreground">My Tutors</h1>
      <MyTutorsTable />
    </div>
    </div>
  );
};

export default MyTutorsPage;