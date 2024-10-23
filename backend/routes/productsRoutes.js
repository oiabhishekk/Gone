import express from "express";
const router = express.Router();

import {
  addProductReview,
  createProduct,
  deleteProduct,
  fetchProductsById,
  getAllProducts,
  getNewProducts,
  getProduct,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

router.route("/allproducts").get(getAllProducts);
router.route("/top").get(getTopProducts);
router.route("/new").get(getNewProducts);

router
  .route("/")
  .post(isAuthenticated, isAdmin, formidable(), createProduct)
  .get(getProduct);
router
  .route("/:id")
  .put(isAuthenticated, isAdmin, formidable(), updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct)
  .get(fetchProductsById);
router.route("/:productid/review").post(isAuthenticated, addProductReview);
export default router;
