import User from "../models/userModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";
import createToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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
  createToken(res, newUser._id);
  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (isPasswordCorrect === true) {
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return; // exit the function after sending the response
    } else {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      throw error;
    }
  }
});
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged Out" });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: { $ne: true } });

  res.json(users);
});
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateCurrentUserProfie = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password; // The password will be hashed in the pre-save middleware
    }
    const updatedUser = await user.save();
    res.json({
      message: "User updated successfully",
      userInfo: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
const deleteUserById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  //check if user is admin
  const user = await User.findById(_id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Invalid User -> Cant't delete a admin");
    }
    await User.deleteOne({ _id });
    res.status(200).json("User deleted Successfully");
  } else {
    res.status(404);
    throw new Error("No user Found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json("User Not Found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = Boolean(req.body.isAdmin);
    }
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      userInfo: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfie,
  deleteUserById,
  getUserById,
  updateUserById,
};
