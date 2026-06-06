'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";


const Navbar = () => {
    

    const { data, error, isPending } = authClient.useSession();
    const user = data?.user;
  useEffect(() => {
        if (isPending) {
            console.log("Session is loading...");
        } else {
            console.log("Actual Session Data:", data);
            console.log("User Data nav:", user);
        }
    }, [data, isPending, user]);

    return (
        <div className="navbar bg-base-100 shadow-sm sm:px-8 px-0 py-2 sticky top-0 z-10 ">
            <div className="navbar-start  ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/tutors">Tutors</Link></li>
                        <li><Link href="/add-tutor">Add Tutor</Link></li>
                        <li><Link href="/my-tutors">My Tutors</Link></li>
                        <li><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl font-bold bg-linear-to-r  from-[#4f39f6] to-[#9514fa] bg-clip-text text-transparent">MediQueue</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/tutors">Tutors</Link></li>
                    <li><Link href="/add-tutor">Add Tutor</Link></li>
                    <li><Link href="/my-tutors">My Tutors</Link></li>
                    <li><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
                </ul>
            </div>

            <div className="navbar-end ">
              {data ?  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Tailwind CSS Navbar component"
                               src={user?.image || 'https://cdn-icons-png.flaticon.com/512/3675/3675805.png'}
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={"/profile"} className=" font-semibold">
                                Profile
                               
                            </Link>
                        </li>
                        <li onClick={() => authClient.signOut()} className=" cursor-pointer">Logout</li>
                    </ul>
                </div>:
                <div className="">
                <Link href={"/login"} className="btn btn-ghost">Login</Link>
                <Link href={"/register"} className="btn btn-ghost">Register</Link>
                </div>
                }
            </div>
        </div>
    );
};

export default Navbar;