// _components/CreateFolderModal.js
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { X, Folder, Plus } from "lucide-react";
import { readToken } from "@/lib/authenticate";

export default function CreateFolderModal({ isOpen, onClose }) {
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    const token = readToken();
    if (!token?.id) {
      console.error("Token missing or invalid");
      return;
    }

    const jobFolderID = uuidv4();

    try {
      const response = await fetch("/api/addJobFolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: jobFolderID,
          name: folderName,
          description,
          userId: token.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.message || "Failed to create folder");
      } else {
        console.log("Folder created:", result);
      }
    } catch (err) {
      console.error("Error calling API:", err);
    }

    setFolderName("");
    setDescription("");
    onClose();
  };

  const handleClose = () => {
    setFolderName("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Folder className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black">Create Job Folder</h2>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name *
            </label>
            <Input
              type="text"
              placeholder="e.g., Software Engineer, Marketing"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <Input
              type="text"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-gray-800 font-medium rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Folder
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 rounded-lg border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
