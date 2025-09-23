// page.js - Updated Dashboard Page Using Context
"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Folder, ArrowRight, Briefcase, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FolderContext } from "./layout";

export default function Dashboard() {
  const router = useRouter();
  const { folders } = useContext(FolderContext);

  const handleFolderClick = (folderId) => {
    router.push(`/dashboard/folders/${folderId}`);
  };

  return (
    <div className="p-8 h-full bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black mb-2">Job Folders</h1>
        <p className="text-gray-600">Organize your job applications by category or role</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Folders</span>
          </div>
          <div className="text-2xl font-bold text-black">{folders.length}</div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Jobs</span>
          </div>
          <div className="text-2xl font-bold text-black">
            {folders.reduce((total, folder) => total + folder.jobCount, 0)}
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">This Week</span>
          </div>
          <div className="text-2xl font-bold text-black">5</div>
        </div>
      </div>

      {/* Folders Grid */}
      {folders.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black">Your Job Folders</h2>
            <span className="text-sm text-gray-500">{folders.length} folders</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className={`${folder.color} border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Folder className="w-6 h-6 text-gray-700" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-black">
                  {folder.name}
                </h3>
                
                {folder.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {folder.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Briefcase className="w-4 h-4" />
                  <span>{folder.jobCount} jobs</span>
                </div>
                
                <p className="text-xs text-gray-500">
                  Created {new Date(folder.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Folder className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No job folders yet</h3>
          <p className="text-gray-600 mb-6">Create your first folder to start organizing your job applications</p>
          <div className="text-sm text-gray-500">
            Click "Create Job Folder" in the sidebar to get started
          </div>
        </div>
      )}
    </div>
  );
}