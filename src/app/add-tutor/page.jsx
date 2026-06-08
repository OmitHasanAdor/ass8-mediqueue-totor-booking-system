import AddTutorsForm from "@/components/AddTutorsForm";


export const metadata = {
  title: "Add Tutor | MediQueue",
  description: "Become a tutor, add your details, teaching subjects, and start sharing your knowledge.",
};

const AddTutorsPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <h1 className="p-5 font-bold text-2xl text-center">Add Tutor</h1>
      <AddTutorsForm />
    </div>
  );
};

export default AddTutorsPage;