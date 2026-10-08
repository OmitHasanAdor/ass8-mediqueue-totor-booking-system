"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiSettings, FiSave } from "react-icons/fi";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "MediQueue",
    supportEmail: "support@mediqueue.com",
    maintenanceMode: false,
    allowNewRegistrations: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Later backend e save korte parba
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiSettings /> Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Platform configuration
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6"
      >
        {/* Site Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Site Name
          </label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Support Email
          </label>
          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Maintenance Mode
            </span>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Allow New Registrations
            </span>
            <input
              type="checkbox"
              name="allowNewRegistrations"
              checked={settings.allowNewRegistrations}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        {/* Save */}
        <button type="submit" className="btn btn-primary gap-2 mt-4">
          <FiSave /> Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;