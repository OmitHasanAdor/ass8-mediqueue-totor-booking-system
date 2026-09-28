import { requireRole } from "@/lib/require-role";
import Link from "next/link";
import { FiUsers, FiBookOpen, FiBarChart2, FiSettings } from "react-icons/fi";

export default async function AdminDashboard() {
  const user = await requireRole("admin");

  const cards = [
    {
      title: "All Users",
      description: "Manage students and tutors",
      href: "/dashboard/admin/users",
      icon: FiUsers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "All Sessions",
      description: "View and manage all tutoring sessions",
      href: "/dashboard/admin/sessions",
      icon: FiBookOpen,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Analytics",
      description: "Platform statistics and reports",
      href: "/dashboard/admin/analytics",
      icon: FiBarChart2,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Settings",
      description: "Platform configuration",
      href: "/dashboard/admin/settings",
      icon: FiSettings,
      color: "from-gray-500 to-slate-600",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back, {user.name}. Manage the entire platform.
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