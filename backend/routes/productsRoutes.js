import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  fetchProductsById,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
router.route("/allproducts").get(getAllProducts);

router
  .route("/")
  .post(isAuthenticated, isAdmin, formidable(), createProduct)
  .get(getProduct);
router
  .route("/:id")
  .put(isAuthenticated, isAdmin, formidable(), updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct)
  .get(fetchProductsById);
export default router;
