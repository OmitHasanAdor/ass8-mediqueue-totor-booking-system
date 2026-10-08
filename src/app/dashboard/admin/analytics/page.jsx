"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

const AdminAnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/stats`,
        {
          headers: { authorization: `Bearer ${tokenData?.token}` },
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Failed");
      setStats(await res.json());
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: FiUsers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Tutors",
      value: stats?.totalTutors ?? 0,
      icon: FiBookOpen,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings ?? 0,
      icon: FiBarChart2,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Paid Bookings",
      value: stats?.paidBookings ?? 0,
      icon: FiCheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Cancelled",
      value: stats?.cancelledBookings ?? 0,
      icon: FiXCircle,
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiBarChart2 /> Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Platform overview & statistics
          </p>
        </div>
        <button onClick={fetchStats} className="btn btn-sm btn-ghost gap-2">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center text-gray-500">Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon className="text-white text-xl" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;