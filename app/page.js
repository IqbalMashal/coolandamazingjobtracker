"use client";
import NavBar from "@/components/ui/navbar";

export default function HeroSectionOne() {
  return (
    <>
      <NavBar/>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-80 md:w-lg lg:w-lg">
            <h1 className="text-5xl font-bold">Job Tracker</h1>
            <p className="py-6">
              A simple and effective tool to stay organized and keep track of your applications.
            </p>
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <img
            src="https://placehold.co/600x400"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </>
  );
}

