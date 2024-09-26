"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Cookies from "js-cookie";
import { BackgroundLines } from "./ui/background-lines";
import { RainbowButton } from "./ui/rainbowButton";

const Navbar = () => {
  return (
    <BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4 bg-white">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-300 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Inceptum Junior <br /> Entreprise.
      </h2>
      <p className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto text-xs sm:text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        L'excellence et l'innovation au service de vos projets.
      </p>
      <Link href="/account/login" className="flex items-center">

      <button
  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-1 sm:p-2 md:p-3 text-sm sm:text-base md:text-lg font-semibold leading-6 sm:leading-7 md:leading-8 text-white inline-block mt-8 sm:mt-10 md:mt-12"
>
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    ></span>
  </span>
  <div
    className="relative flex space-x-2 sm:space-x-3 items-center z-10 rounded-full bg-zinc-800 py-1 px-4 sm:py-2 sm:px-6 ring-1 ring-white/10"
  >
    <span>{`Allons-y !`}</span>
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.75 8.75L14.25 12L10.75 15.25"
      ></path>
    </svg>
  </div>
  <span
    className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-3rem)] sm:w-[calc(100%-4.25rem)] bg-gradient-to-r from-emerald-400/0 via-red-400 to-white transition-opacity duration-500 group-hover:opacity-40"
  ></span>
</button>

      </Link>

    </BackgroundLines>
  );
};

export default Navbar;
