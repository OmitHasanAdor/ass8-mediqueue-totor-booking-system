"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiBookOpen, FiRefreshCw, FiTrash2 } from "react-icons/fi";

const AdminSessionsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-bookings`,
        {
          headers: { authorization: `Bearer ${tokenData?.token}` },
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Failed");
      setBookings(await res.json());
    } catch {
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
        {
          method: "PATCH",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        }
      );
      if (res.ok) {
        toast.success("Booking cancelled");
        fetchBookings();
      } else toast.error("Cancel failed");
    } catch {
      toast.error("Error cancelling");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking permanently?")) return;
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${tokenData?.token}` },
        }
      );
      if (res.ok) {
        toast.success("Booking deleted");
        fetchBookings();
      } else toast.error("Delete failed");
    } catch {
      toast.error("Error deleting");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiBookOpen /> All Sessions
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage all bookings</p>
        </div>
        <button onClick={fetchBookings} className="btn btn-sm btn-ghost gap-2">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Tutor</th>
                  <th className="px-4 py-3 text-left">Fee</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr
                    key={b._id}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.userName}</div>
                      <div className="text-xs text-gray-500">{b.userEmail}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{b.tutorName}</td>
                    <td className="px-4 py-3">${b.hourlyFee}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          b.status === "paid"
                            ? "bg-green-100 text-green-600"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {b.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(b._id)}
                            className="btn btn-xs btn-warning"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="btn btn-xs btn-error btn-outline"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSessionsPage;