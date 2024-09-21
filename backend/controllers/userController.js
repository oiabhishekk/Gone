import User from "../models/userModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    const error = new Error("Please fill all the inputs.");
    error.statusCode = 400;
    throw error;
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User already exist with this email");
    error.statusCode = 409;
    throw error;
  }
  //creating a new User
  const newUser = new User({
    username,
    email,
    password,
  });
  //password is getting hashed in schema
  await newUser.save();
  res.status(201).json({
    message: "User successfuly Created",
    userInfo: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

export { createUser };
