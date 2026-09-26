"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center transition-colors duration-500">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        {/* Error Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold px-5 py-1.5 rounded-full text-sm mb-6 shadow-sm tracking-wide"
        >
          Error 404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-4xl sm:text-5xl font-black text-gray-800 dark:text-white mb-4 tracking-tight"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-300 text-base max-w-md mx-auto mb-10 leading-relaxed"
        >
          Oops! The page you are looking for doesn&apos;t exist. It might have been moved, deleted, or the tutor session link is invalid.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              <FiHome className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          <Link href="/tutors">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
              Find Tutors
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;