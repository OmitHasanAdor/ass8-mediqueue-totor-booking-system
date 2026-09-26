import { requireRole } from "@/lib/require-role";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: {
    template: "%s | MediQueue Student",
    default: "Student Dashboard",
  },
  robots: { index: false, follow: false },
};

export default async function StudentLayout({ children }) {
  const user = await requireRole("student");

  return (
    <DashboardLayout
      role="student"
      userName={user.name}
      userEmail={user.email}
    >
      {children}
    </DashboardLayout>
  );
}