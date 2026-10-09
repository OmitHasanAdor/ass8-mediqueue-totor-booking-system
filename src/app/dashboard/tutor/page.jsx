"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiPlusCircle,
  FiBookOpen,
  FiUser,
  FiUsers,
  FiLayers,
} from "react-icons/fi";

const TutorDashboard = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyTutors = async () => {
      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${user.email}`,
          {
            headers: { authorization: `Bearer ${tokenData?.token}` },
            cache: "no-store",
          }
        );
        if (res.ok) {
          setTutors(await res.json());
        }
      } catch {
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTutors();
  }, [user?.email]);

  const totalSessions = tutors.length;
  const totalSlots = tutors.reduce((sum, t) => sum + (t.totalSlot || 0), 0);

const cards = [
  {
    title: "My Sessions",
    description: "Manage your tutoring sessions",
    href: "/dashboard/tutor/my-tutors",
    icon: FiBookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add Session",
    description: "Create a new tutoring session",
    href: "/dashboard/tutor/add-tutor",
    icon: FiPlusCircle,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Profile",
    description: "Update your information",
    href: "/profile",
    icon: FiUser,
    color: "from-pink-500 to-rose-500",
  },
];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome, {user?.name || "Tutor"} 🎓
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your sessions and help students learn.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FiLayers className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {loading ? "..." : totalSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <FiUsers className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Remaining Slots</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {loading ? "..." : totalSlots}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
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
};

export default TutorDashboard;