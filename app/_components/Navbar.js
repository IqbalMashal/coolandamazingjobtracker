import React from 'react'
import Link from 'next/link'
import { FileUser } from "lucide-react"



function Navbar(){



  return (
    <nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <Link
      href={"/"}>
        <div className="flex items-center gap-2">
          <FileUser size={40}/>
          <h1 className="text-base font-bold md:text-2xl">TrackMyJob</h1>
        </div>
      </Link>
      <div>
        <Link
          href={"/login"}>
          <button
          className="w-24 mr-5 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer">
          Login
        </button>
        
        </Link>
        <Link href={"/signup"}>
          <button
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar