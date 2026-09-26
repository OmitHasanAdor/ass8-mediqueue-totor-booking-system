"use client";

import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 bg-linear-to-br from-purple-50/50 via-white to-indigo-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30 transition-colors duration-500">
      
      <div className="relative flex items-center justify-center">
        {/* Outer soft pulse ring */}
        <motion.div
          className="absolute w-28 h-28 rounded-full bg-linear-to-r from-[#4f39f6]/20 to-[#9514fa]/20"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle rotating ring */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border-[3px] border-transparent border-t-[#4f39f6] border-r-[#9514fa]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Brain Icon with gentle bounce */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-full bg-linear-to-br from-[#4f39f6] to-[#9514fa] flex items-center justify-center shadow-lg shadow-[#4f39f6]/40"
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaBrain className="text-white text-2xl" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold bg-linear-to-r from-[#4f39f6] via-[#9514fa] to-[#4f39f6] bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient tracking-wide">
          Loading MediQueue
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
          Preparing your learning session...
        </p>
      </motion.div>

      {/* Custom gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;