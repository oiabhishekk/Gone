import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "User not found, authorization denied" });
  } else {
    try {
      const decodeUser = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodeUser.userId).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found, authorization denied" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    }
  }
};
const isAdmin = async (req, res, next) => {
  
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied" });
  }
};
export { isAuthenticated, isAdmin };
