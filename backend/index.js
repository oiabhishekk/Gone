//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoriesRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Global error handling middleware to handle bad json
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON:", err);
    return res.status(400).json({
      status: 400,
      message: "Invalid JSON format. Please check your request body.",
    });
  }
  next(err);
});
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.get("", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log(" 💾Server is listening on port " + port + "😁");
});
