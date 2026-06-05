"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/banner1.png",
    title: "Find the Perfect Tutor for Your Success",
    description:
      "Connect with experienced tutors and book sessions instantly with a seamless scheduling experience.",
  },
  {
    image: "/assets/banner2.png",
    title: "Book Qualified Tutors Anytime, Anywhere",
    description:
      "Browse verified tutors, compare expertise, and schedule lessons that fit your routine.",
  },
  {
    image: "/assets/banner3.png",
    title: "Learn Faster with Expert Guidance",
    description:
      "Achieve your academic goals through personalized tutoring and flexible online learning.",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative w-full max-w-350 mx-auto my-4 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl h-112.5 md:h-137.5">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex items-center justify-center text-center text-white px-6 md:px-12"
            >
            
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

             
              <div className="absolute inset-0 bg-black/60" />

        
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
                  {slide.title}
                </h1>

                <p className="text-sm md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
                  {slide.description}
                </p>

                <Link
                  href="/tutors"
                  className="inline-block  bg-linear-to-r  from-[#4f39f6] to-[#9514fa] hover:bg-[#9514fa] px-8 py-3 rounded-md font-medium transition-colors duration-300"
                > Find a Tutor
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#2bb49a] backdrop-blur-sm p-3 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

    
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#2bb49a] backdrop-blur-sm p-3 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

   
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to Slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === index
                  ? " bg-linear-to-r  from-[#4f39f6] to-[#9514fa] w-8"
                  : "bg-purple-500/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}