import express from "express";
import {
  createCategory,
  updateCategory,
  removeCategory,
  readCategory,
  listCategory,
} from "../controllers/categoryController.js"; // Ensure all necessary imports
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a new category
router.route("/").post(isAuthenticated, isAdmin, createCategory);

// Route for listing all categories
router.route("/list").get(listCategory);

// Routes for category operations by ID
router
  .route("/:categoryId")
  .put(isAuthenticated, isAdmin, updateCategory) // Update a category
  .delete(isAuthenticated, isAdmin, removeCategory) // Delete a category
  .get(readCategory); // Read a specific category

export default router;
