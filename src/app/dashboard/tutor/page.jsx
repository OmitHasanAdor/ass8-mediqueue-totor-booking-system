import { requireRole } from "@/lib/require-role";
import Link from "next/link";
import { FiPlusCircle, FiBookOpen, FiCalendar, FiUser } from "react-icons/fi";

export default async function TutorDashboard() {
  const user = await requireRole("tutor");

  const cards = [
    {
      title: "Add New Session",
      description: "Create a new tutoring session",
      href: "/add-tutor",
      icon: FiPlusCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "My Sessions",
      description: "Manage your created sessions",
      href: "/my-tutors",
      icon: FiBookOpen,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Bookings",
      description: "See who booked your sessions",
      href: "/my-booked-sessions",
      icon: FiCalendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Profile",
      description: "Update your tutor profile",
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
          Welcome, {user.name} 👨‍🏫
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your sessions and help students grow.
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