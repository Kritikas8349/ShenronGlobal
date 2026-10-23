import multer from "multer";

const acceptedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"]);

export function createUploadMiddleware(env) {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: env.maxVideoSize, files: 1, fields: 0 },
    fileFilter(_req, file, callback) {
      if (!acceptedMimeTypes.has(file.mimetype)) {
        const error = new Error("Upload an image (JPEG, PNG, WebP, GIF) or a video (MP4, WebM).");
        error.status = 400;
        return callback(error);
      }
      callback(null, true);
    },
  }).single("file");
}
