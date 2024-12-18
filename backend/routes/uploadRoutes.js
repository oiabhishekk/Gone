import { Router } from "express";
import multer from "multer";
import path from "path";
import asyncHandler from "../middlewares/asyncHandler.js";
import { upload } from "../middlewares/upload.js";

const router = Router();
const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image Provided" });
//     }
//   });
// });
router.post("/", upload.single("image"), (req, res) => {
  // Check for errors
  if (!req.file) {
    return res
      .status(400)
      .send({ message: "No image provided or file is too large." });
  }

  // Respond with success message and file information
  res.status(200).send({
    message: "Image uploaded successfully",
    image: `/${req.file.path}`,
  });
});

export default router;
