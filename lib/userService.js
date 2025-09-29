const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mongoDBConnectionString = process.env.MONGODB_STRING;

if (!mongoDBConnectionString) {
  throw new Error("❌ MONGODB_STRING is not defined in environment variables");
}

let isConnected = false; // To prevent repeated connections
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(mongoDBConnectionString, { maxPoolSize: 5 });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

// ------------------ USER SCHEMA ------------------ //
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  folderCount: { type: Number, default: 0 },
  jobsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Prevent recompiling model in dev
const User = mongoose.models.User || mongoose.model("User", userSchema);

// ------------------ REGISTER USER ------------------ //
const registerUser = async function (userData) {
  await connectDB();

  if (!userData || !userData.firstName || !userData.password) {
    throw new Error("Username and password are required");
  }

  if (userData.password !== userData.password2) {
    throw new Error("Passwords do not match");
  }

  try {
    const hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    delete userData.password2;

    const newUser = new User(userData);
    await newUser.save();

    return `User ${userData.fullName} successfully registered`;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("User email already taken");
    }
    throw new Error(`There was an error creating the user: ${err.message}`);
  }
};

// ------------------ LOGIN / CHECK USER ------------------ //
const checkUser = async function (userData) {
  await connectDB();

  if (!userData || !userData.email || !userData.password) {
    throw new Error("Username and password are required");
  }

  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error(`Unable to find user ${userData.email}`);
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error(`Incorrect password for user ${userData.email}`);
  }

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// ------------------ GET USER BY ID ------------------ //
const getUser = async function (userID) {
  await connectDB();

  try {
    const objectId = new mongoose.Types.ObjectId(userID);
    return await User.findById(objectId)
      .select("-password -__v")
      .lean();
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

// ------------------ EXPORTS ------------------ //
module.exports = {
  registerUser,
  checkUser,
  getUser,
  userSchema,
  connectDB, // in case other files need it
};
