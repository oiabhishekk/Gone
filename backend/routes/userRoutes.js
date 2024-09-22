import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfie,
  deleteUserById,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(createUser).get(isAuthenticated, isAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(isAuthenticated, getCurrentUserProfile)
  .put(isAuthenticated, updateCurrentUserProfie);

// admin routes
router.route('/:id').delete(isAuthenticated,isAdmin,deleteUserById)

export default router;
