const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  imageData: Buffer, // Storing image data as binary
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
