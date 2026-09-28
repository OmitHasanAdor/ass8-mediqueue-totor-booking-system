"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBookOpen,
  FiCalendar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiUsers,
  FiPlusCircle,
  FiBarChart2,
  FiShield,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";

const menuItems = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: FiHome },
    { name: "My Bookings", href: "/my-booked-sessions", icon: FiCalendar },
    { name: "Find Tutors", href: "/tutors", icon: FiSearch },
    { name: "Profile", href: "/profile", icon: FiUser },
  ],
  tutor: [
    { name: "Dashboard", href: "/dashboard/tutor", icon: FiHome },
    { name: "My Tutors", href: "/my-tutors", icon: FiBookOpen },
    { name: "Add Session", href: "/add-tutor", icon: FiPlusCircle },
    { name: "Profile", href: "/profile", icon: FiUser },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: FiHome },
    { name: "All Users", href: "/dashboard/admin/users", icon: FiUsers },
    { name: "All Sessions", href: "/dashboard/admin/sessions", icon: FiBookOpen },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: FiBarChart2 },
    { name: "Settings", href: "/dashboard/admin/settings", icon: FiSettings },
  ],
};

// Extra icon import
import { FiSearch } from "react-icons/fi";

const Sidebar = ({ role = "student", userName = "User", userEmail = "" }) => {
  const pathname = usePathname();
  const items = menuItems[role] || menuItems.student;

  return (
    <aside className="w-full md:w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#4f39f6] to-[#9514fa] flex items-center justify-center shadow-md">
          <FaBrain className="text-white text-lg" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">MediQueue</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Panel</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
          {userName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {userEmail}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => {
            // Better Auth logout call later
            window.location.href = "/api/auth/sign-out";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;