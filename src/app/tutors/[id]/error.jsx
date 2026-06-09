"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Tutor Page Error:", error);
  }, [error]);

  return (
    <div className="text-center my-20 space-y-4">
      <h2 className="text-2xl font-bold text-purple-600">Something went wrong!</h2>
      <p className="text-gray-500">{error.message || "Failed to load tutor details."}</p>
      <button
        onClick={() => reset()}
        className="btn bg-linear-to-r  from-[#4f39f6] to-[#9514fa] text-white hover:bg-purple-600 mx-2"
      >
        Try Again
      </button>
    </div>
  );
}