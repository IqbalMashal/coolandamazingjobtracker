// _components/SideBar.js - Updated with Modal Integration
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout, Shield, FileText, HelpCircle, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar({ onCreateFolder }) {
  const [count] = useState(12); // Example: number of jobs tracked
  const path = usePathname();

  const handleCreateFolderClick = (e) => {
    e.preventDefault();
    // Call the parent function to open the modal
    if (onCreateFolder) {
      onCreateFolder();
    }
  };

  return (
    <div className="h-screen bg-white text-gray-900 flex flex-col border-r border-gray-200 w-80 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <p className="text-sm text-gray-600 mt-1">Organize your job search</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-6 space-y-8">
        {/* Dashboard Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Dashboard
          </h3>

          <div className="space-y-2">
            <div
              onClick={handleCreateFolderClick}
              className="group flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:text-white"
            >
              <Plus className="w-5 h-5 text-gray-500 group-hover:text-white" />
              <span className="font-medium text-sm">Create Job Folder</span>
            </div>

            <Link href="/dashboard">
              <div
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  path === "/dashboard"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Layout
                  className={`w-5 h-5 ${
                    path === "/dashboard"
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                <span className="font-medium text-sm">My Job Folders</span>
                <span
                  className={`ml-auto text-xs px-2 py-1 rounded-full font-semibold ${
                    path === "/dashboard"
                      ? "bg-white text-black"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </span>
              </div>
            </Link>

            <Link href="/dashboard/jobs">
              <div
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  path === "/dashboard/jobs"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText
                  className={`w-5 h-5 ${
                    path === "/dashboard/jobs"
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                <span className="font-medium text-sm">All Jobs</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Account
          </h3>

          <Link href="/dashboard/upgrade">
            <div
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                path === "/dashboard/upgrade"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Shield
                className={`w-5 h-5 ${
                  path === "/dashboard/upgrade"
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span className="font-medium text-sm">Upgrade</span>
              <span className="ml-auto text-xs bg-black text-white px-2 py-1 rounded-full font-semibold">
                Pro
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Storage Progress Section */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900">Storage Used</h4>
            <span className="text-xs text-gray-500 font-medium">4/5 GB</span>
          </div>

          <div className="mb-4">
            <Progress
              value={80}
              className="h-2 bg-gray-200 [&>div]:bg-black"
            />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 text-sm font-medium h-9 shadow-sm rounded-lg">
            Upgrade Storage
          </Button>
        </div>
      </div>
    </div>
  );
}