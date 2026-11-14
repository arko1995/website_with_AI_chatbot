import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { url } from "inspector";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export const uploadCover = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WebP images are allowed."));
    }
    cb(null, true);
  },
});

export async function uploadToCloudinary(buffer, mimetype) {
  const base64 = buffer.toString("base64");
  const dataURI = `data:${mimetype};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "skylinedb3/blogs",
    resource_type: "image",
    overwrite: false,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}
