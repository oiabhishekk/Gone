import { Router } from "express";
import multer from "multer";
import path from "path";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router.route("/").post(
  asyncHandler(async (req, res) => {
    res.send("hi");
  })
);

export default router;
