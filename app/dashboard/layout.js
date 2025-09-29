"use client";
import React, { useState, useEffect } from "react";
import SideBar from "./_components/SideBar";
import CreateFolderModal from "./_components/CreateFolderModal";
import { readToken } from "@/lib/authenticate";

export const FolderContext = React.createContext();

export default function DashboardLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const user = readToken()

  useEffect(() => {    
    const fetchFolders = async () => {
      try {
        const res = await fetch(`/api/getJobFolder?userID=${user.id}`); 
        const data = await res.json();
        setFolders(data);
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      }
    };

    fetchFolders();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCreateFolder = (newFolder) =>
    setFolders((prev) => [newFolder, ...prev]);

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:block w-80 border-r border-gray-200 bg-white">
            <SideBar onCreateFolder={handleOpenModal} />
          </aside>
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>

        <CreateFolderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreateFolder={handleCreateFolder}
        />
      </div>
    </FolderContext.Provider>
  );
}
