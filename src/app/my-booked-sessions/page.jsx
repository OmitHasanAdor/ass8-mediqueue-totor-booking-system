import MyBookedSessionsClient from "@/components/MyBookedSessionsClient";

export const metadata = {
  title: "My Booked Sessions | MediQueue",
  description: "View and manage your booked tutoring sessions, track fees, status, or cancel bookings easily.",
};

const MyBookedSession = () => {
  return (
    <div>
      <MyBookedSessionsClient />;
    </div>
  );
};

export default MyBookedSession;