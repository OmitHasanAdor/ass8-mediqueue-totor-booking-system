"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiShield } from "react-icons/fi";
import Link from "next/link";

const ProfileInfo = () => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setLoading(true);
      const { error } = await authClient.updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      setEditing(false);
      refetch?.();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      image: user?.image || "",
    });
    setEditing(false);
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Please login to view profile</p>
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  const roleColors = {
    admin: "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/40",
    tutor: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-900/40",
    student:
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/40",
  };

  const avatarSrc = form.image || user.image;

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account details
          </p>
        </div>

        {/* Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          {/* Soft header — no loud gradient */}
          <div className="h-20 rounded-t-2xl bg-gray-100 dark:bg-zinc-800/80" />

          <div className="px-6 pb-6">
            {/* Avatar — centered overlap */}
            <div className="flex justify-center -mt-10 mb-4">
    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white dark:ring-zinc-900 bg-gray-200 dark:bg-zinc-700 shadow-md shrink-0">
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={user.name || "User"}
          fill
          sizes="80px"
          className="object-cover object-center"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-400">
          {(user.name || "U")[0].toUpperCase()}
        </div>
      )}
    </div>
  </div>

            {/* Name + role + edit */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <span
                className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium capitalize border ${
                  roleColors[user.role] || roleColors.student
                }`}
              >
                {user.role || "student"}
              </span>

              {!editing && (
                <div className="mt-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* View */}
            {!editing ? (
              <div className="space-y-3 mb-3">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center">
                    <FiUser className="text-gray-400 w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-800 dark:text-gray-100 truncate">
                      {user.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center">
                    <FiMail className="text-gray-400 w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium text-gray-800 dark:text-gray-100 break-all">
                      {user.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center">
                    <FiShield className="text-gray-400 w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Role</p>
                    <p className="font-medium text-gray-800 dark:text-gray-100 capitalize">
                      {user.role || "student"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit */
              <form onSubmit={handleSave} className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="input input-bordered w-full rounded-xl"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-neutral rounded-xl gap-2"
                  >
                    <FiSave className="w-4 h-4" />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="btn btn-ghost rounded-xl gap-2"
                  >
                    <FiX className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;