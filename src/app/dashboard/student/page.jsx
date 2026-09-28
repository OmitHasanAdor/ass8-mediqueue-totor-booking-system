import { requireRole } from "@/lib/require-role";
import Link from "next/link";
import { FiCalendar, FiSearch, FiBookOpen, FiUser } from "react-icons/fi";

export default async function StudentDashboard() {
  const user = await requireRole("student");

  const cards = [
    {
      title: "My Bookings",
      description: "View and manage your booked sessions",
      href: "/my-booked-sessions",
      icon: FiCalendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Find Tutors",
      description: "Browse available tutors and book sessions",
      href: "/tutors",
      icon: FiSearch,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Profile",
      description: "Update your personal information",
      href: "/profile",
      icon: FiUser,
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center mb-4 shadow-md`}
              >
                <Icon className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-[#4f39f6] transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}