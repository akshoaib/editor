const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const multer = require("multer"); // For handling file uploads
const path = require("path");

import Image from "../../models/image";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(
  "mongodb+srv://akhtarshoaib317:shoaib@cluster0.klwgwem.mongodb.net/",
  { useNewUrlParser: true }
);

// // Configure multer for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.prepare().then(() => {
//   const server = express();

//   // Create your Express routes

//   const handler = () => {};
//   server.post("/api/upload", upload.single("image"), async (req, res) => {
//     try {
//       const { originalname, buffer } = req.file;
//       const newImage = new Image({
//         name: originalname,
//         imageData: buffer,
//       });

//       await newImage.save();

//       res.status(201).json({ message: "Image uploaded successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

//   // For all other requests, use Next.js
//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });

export async function POST(req, res) {
  console.log("newss", req.file);
  res.status(200).json({ love: "love" });
}
