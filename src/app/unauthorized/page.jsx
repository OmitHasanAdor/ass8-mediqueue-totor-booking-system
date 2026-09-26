"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiLock, FiHome, FiLogIn } from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 px-4 transition-colors duration-500">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Animated Lock Icon */}
        <motion.div
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="mx-auto mb-8 w-28 h-28 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-lg"
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <FiLock className="text-5xl text-red-500 dark:text-red-400" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Access Denied
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed"
        >
          Sorry, you don’t have permission to view this page.
          <br />
          Please login with the correct account.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary gap-2 px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <FiHome size={18} />
              Go Home
            </motion.button>
          </Link>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-outline btn-primary gap-2 px-8 py-3 rounded-full"
            >
              <FiLogIn size={18} />
              Login Again
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}