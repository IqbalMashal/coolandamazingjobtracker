// layout.js - Updated Dashboard Layout with Modal Management
"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import CreateFolderModal from "./_components/CreateFolderModal";

// Create a context to share folder data across components
export const FolderContext = React.createContext();

export default function DashboardLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([
    {
      id: "1",
      name: "Software Developer",
      description: "Full-stack and backend positions",
      jobCount: 8,
      color: "bg-blue-50 border-blue-200",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "IT Internships",
      description: "Entry-level opportunities",
      jobCount: 5,
      color: "bg-green-50 border-green-200",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Product Manager",
      description: "Product strategy and management roles",
      jobCount: 12,
      color: "bg-purple-50 border-purple-200",
      createdAt: "2024-01-08",
    },
    {
      id: "4",
      name: "Data Science",
      description: "Analytics and ML positions",
      jobCount: 3,
      color: "bg-orange-50 border-orange-200",
      createdAt: "2024-01-05",
    },
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateFolder = (newFolder) => {
    setFolders(prevFolders => [newFolder, ...prevFolders]);
  };

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:block w-80 border-r border-gray-200 bg-white">
            <SideBar onCreateFolder={handleOpenModal} />
          </aside>
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {children}
          </main>
        </div>

        {/* Create Folder Modal */}
        <CreateFolderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateFolder={handleCreateFolder}
        />
      </div>
    </FolderContext.Provider>
  );
}