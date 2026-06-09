import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:text-black border-t">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900">
              MediQueue
            </h2>

            <p className="mt-4 text-slate-600 max-w-md leading-relaxed">
              Connect with qualified tutors effortlessly. Book sessions,
              schedule lessons, and learn from trusted educators all in one
              place.
            </p>

           
            <div className="mt-6 flex  max-w-sm md:max-w-md justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-3 border border-slate-300 rounded-l-xl outline-none focus:border-blue-500"
              />
              <button className="px-3  bg-linear-to-r  from-[#4f39f6] to-[#9514fa] text-white rounded-r-xl hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

         
          <div>
            <h3 className="font-semibold text-slate-900 mb-4"> Quick Links</h3>

            <ul className="space-y-3 text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              </li>

              <li>
                <Link
                  href="/tutors"
                  className="hover:text-blue-600 transition"
                >Find Tutors</Link>
              </li>

              <li>
                <Link
                  href="/my-booked-sessions"
                  className="hover:text-blue-600 transition">My Bookings</Link>
              </li>

              <li>
                <Link href="/profile" className="hover:text-blue-600 transition"
                > Profile </Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-semibold text-slate-900 mb-4"> Contact </h3>

            <ul className="space-y-3 text-slate-600">
              <li>ibneshams05@gmail.com</li>
              <li>+880 1234 567 890</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

      
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 MediQueue. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
            >
              <FaLinkedinIn />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;