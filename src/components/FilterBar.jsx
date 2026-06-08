'use client';

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const FilterBar = ({ currentSearch, currentStartDate, currentEndDate }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(currentSearch);
  const [startDate, setStartDate] = useState(currentStartDate);
  const [endDate, setEndDate] = useState(currentEndDate);

 
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

 
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [search, startDate, endDate, router, pathname]);

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 items-end bg-gray-50 dark:bg-zinc-900 p-5 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
      {/* Search Tutor */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Search Tutor</label>
        <input
          type="text"
          placeholder="Search tutor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Reset Button */}
      <div>
        <button
          onClick={handleReset}
          className="w-full bg-white hover:bg-gray-100 text-gray-700 font-semibold p-2.5 rounded-xl border border-gray-200 transition-all text-sm active:scale-[0.99] shadow-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;