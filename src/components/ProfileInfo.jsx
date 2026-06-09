"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const ProfileInfo = () => {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between p-6 gap-8 md:gap-12 border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        
      
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <DotLottieReact
              src="/teaching.lottie"
              loop
              autoplay
            />
          </div>
        </div>

     
        <div className="w-full md:w-1/2">
          <div className="max-w-md mx-auto w-full">
            
          
            <div className="mb-6 pb-4 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-4">
              {session?.user?.image ? (
                <Image
                  width={64}
                  height={64} 
                  src={session?.user.image} 
                  alt={session?.user.name || "User"} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
                  {session?.user?.name ? session?.user.name[0] : "U"}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">My Profile</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your personal information</p>
              </div>
            </div>

        
            <div className="space-y-4">
              
           
              <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Full Name
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200 block">
                  {session?.user?.name || "N/A"}
                </span>
              </div>

            
              <div className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-300 break-all">
                  {session?.user?.email || "N/A"}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileInfo;