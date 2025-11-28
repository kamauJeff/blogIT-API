import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { register, login, logout, changePassword } from "./controllers/auth.ts";
import { checkDetails } from "./middlewares/checkDetails.ts";
import { checkUsernameAndEmail } from "./middlewares/checkUsernameAndEmail.ts";
import { checkPasswordStrength } from "./middlewares/checkPasswordStrength.ts";
import {
  createBlog,
  getBlogs,
  getBlog,
  completeBlog,
  incompleteBlog,
  deleteBlog,
  trash,
  recoverDeletedBlog,
  updateBlog,
  movingBlogsToTrash,
} from "./controllers/blogs.ts";
import { verifyToken } from "./middlewares/verifyToken.ts";
import { validateDetails } from "./middlewares/validateBlogDetails.ts";
import {
  getUserProfile,
  updateProfile,
  deleteProfile,
} from "./controllers/user.ts";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Welcome to Blogit API</h1>");
});

app.post(
  "/auth/register",
  checkDetails,
  checkUsernameAndEmail,
  checkPasswordStrength,
  register,
);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
app.patch("/auth/password", verifyToken, checkPasswordStrength, changePassword);

// Blogs Endpoint
app.post("/blogs", verifyToken, validateDetails, createBlog);
app.get("/blogs", verifyToken, getBlogs);
app.get("/blogs/trash", verifyToken, trash);
app.get("/blogs/:id", verifyToken, getBlog);
app.patch("/blogs/complete/:id", verifyToken, completeBlog);
app.patch("/blogs/in-complete/:id", verifyToken, incompleteBlog);
app.patch("/blogs/recover/:id", verifyToken, recoverDeletedBlog);
app.put("/blogs/:id/trash", verifyToken, movingBlogsToTrash); 
app.patch("/blogs/:id", verifyToken, validateDetails, updateBlog);
app.delete("/blogs/:id", verifyToken, deleteBlog);

//User Endpoints
app.get("/users", verifyToken, getUserProfile);
app.patch("/users", verifyToken, checkUsernameAndEmail, updateProfile);
app.delete("/users", verifyToken, deleteProfile);

const PORT = 1000;
app.listen(PORT, function () {
  console.log(`APP is live at: http://localhost:${PORT}/`);
});


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;
