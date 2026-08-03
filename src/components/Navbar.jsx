'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {

    const { data } = authClient.useSession();
    const user = data?.user;

    const navLinks = (
        <>
            <li><Link href="/" className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link href="/tutors" className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Tutors</Link></li>
            {data && (
                <>
                    <li><Link href="/add-tutor" className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Add Tutor</Link></li>
                    <li><Link href="/my-tutors" className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">My Tutors</Link></li>
                    <li><Link href="/my-booked-sessions" className="font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">My Booked Sessions</Link></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 dark:bg-black dark:text-white shadow-sm sm:px-8 px-2 py-2.5 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-900">

            {/* Left: mobile menu + logo */}
            <div className="navbar-start gap-1">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 dark:bg-zinc-900 rounded-2xl z-1 mt-3 w-56 p-3 shadow-lg gap-1 font-semibold dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                        {navLinks}
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl font-bold bg-linear-to-r from-[#4f39f6] to-[#9514fa] bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                    MediQueue
                </Link>
            </div>

            {/* Center: desktop nav */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {navLinks}
                </ul>
            </div>

            {/* Right: auth + theme */}
            <div className="navbar-end gap-1">
                {data ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2 ring-purple-500/40 ring-offset-2 ring-offset-base-100 dark:ring-offset-black overflow-hidden">
                                <Image
                                    alt={user?.name || "User avatar"}
                                    src={user?.image || 'https://cdn-icons-png.flaticon.com/512/3675/3675805.png'}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 dark:bg-zinc-900 rounded-2xl z-1 mt-3 w-52 p-3 gap-1 shadow-lg border border-gray-100 dark:border-gray-800">
                            <li>
                                <Link href="/profile" className="font-semibold rounded-lg">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => authClient.signOut()}
                                    className="cursor-pointer text-red-500 font-semibold rounded-lg"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">Login</Link>
                        <Link href="/register" className="btn bg-linear-to-r from-[#4f39f6] to-[#9514fa] text-white border-none hover:opacity-90 btn-sm sm:btn-md hidden sm:flex">
                            Register
                        </Link>
                    </div>
                )}
                <div className="ml-1">
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};

export default Navbar;