import { requireRole } from "@/lib/require-role";
import DashboardLayout from "@/components/DashboardLayout";

export const metadata = {
  title: {
    template: "%s | MediQueue Tutor",
    default: "Tutor Dashboard",
  },
  robots: { index: false, follow: false },
};

export default async function TutorLayout({ children }) {
  const user = await requireRole("tutor");

  return (
    <DashboardLayout
      role="tutor"
      userName={user.name}
      userEmail={user.email}
    >
      {children}
    </DashboardLayout>
  );
}