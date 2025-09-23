// _components/CreateFolderModal.js
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Folder, Plus } from "lucide-react";

export default function CreateFolderModal({ isOpen, onClose, onCreateFolder }) {
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    const colors = [
      "bg-blue-50 border-blue-200",
      "bg-green-50 border-green-200", 
      "bg-purple-50 border-purple-200",
      "bg-orange-50 border-orange-200",
      "bg-pink-50 border-pink-200",
      "bg-yellow-50 border-yellow-200",
      "bg-indigo-50 border-indigo-200",
      "bg-teal-50 border-teal-200",
    ];

    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      description: description,
      jobCount: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreateFolder(newFolder);
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
        {/* Header */}
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name *
            </label>
            <Input
              type="text"
              placeholder="e.g., Software Engineer, Marketing, Data Science"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border-gray-300 focus:border-black focus:ring-black"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <Input
              type="text"
              placeholder="Brief description of this job category"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          {/* Examples */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Software Engineer",
                "Product Manager", 
                "Data Science",
                "Marketing",
                "Design",
                "Sales"
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setFolderName(example)}
                  className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
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