const mongoose = require("mongoose");
const { connectDB } = require("./userService"); // <-- use the new connection

// ------------------ SCHEMA ------------------ //
const jobFolderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  jobCount: { type: Number, default: 0 },
  color: { type: String, required: true },
  createdAt: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// ✅ Prevent model overwrite (important in dev)
const JobFolder =
  mongoose.models.JobFolder ||
  mongoose.model("JobFolder", jobFolderSchema);

// ------------------ ADD JOB FOLDER ------------------ //
const addJobFolder = async function (
  jobFolderID,
  userId,
  folderName,
  description = ""
) {
  await connectDB(); // ✅ ensure connected first

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
    id: jobFolderID,
    name: folderName,
    description,
    jobCount: 0,
    color: colors[Math.floor(Math.random() * colors.length)],
    createdAt: new Date().toISOString().split("T")[0],
    user: userId,
  };

  return await JobFolder.create(newFolder);
};

// ------------------ UPDATE ------------------ //
const updateJobFolder = async function (folderId, updateFields) {
  await connectDB();

  delete updateFields.id;
  delete updateFields.user;

  return await JobFolder.findOneAndUpdate(
    { id: folderId },
    updateFields,
    { new: true }
  );
};

// ------------------ DELETE ------------------ //
const deleteJobFolder = async function (folderId) {
  await connectDB();
  return await JobFolder.findOneAndDelete({ id: folderId });
};

// ------------------ GET USER FOLDERS ------------------ //
const getUserJobFolders = async function (userId) {
  await connectDB();
  return await JobFolder.find({ user: userId }).lean();
};

// ------------------ EXPORTS ------------------ //
module.exports = {
  addJobFolder,
  getUserJobFolders,
  updateJobFolder,
  deleteJobFolder,
};
