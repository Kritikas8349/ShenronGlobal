import { randomUUID } from "node:crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { saveUpload } from "../services/uploadService.js";

function badRequest(message, status = 400) { const error = new Error(message); error.status = status; throw error; }
function sniff(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { mime: "image/png", ext: ".png", kind: "image" };
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return { mime: "image/jpeg", ext: ".jpg", kind: "image" };
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return { mime: "image/webp", ext: ".webp", kind: "image" };
  if (buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6))) return { mime: "image/gif", ext: ".gif", kind: "image" };
  if (buffer.length >= 12 && buffer.toString("ascii", 4, 8) === "ftyp") return { mime: "video/mp4", ext: ".mp4", kind: "video" };
  if (buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) return { mime: "video/webm", ext: ".webm", kind: "video" };
  return null;
}

export const uploadMedia = (env) => asyncHandler(async (req, res) => {
  if (!req.file) return badRequest("Choose an image or video file to upload.");
  const detected = sniff(req.file.buffer);
  if (!detected || detected.mime !== req.file.mimetype) return badRequest("The file content does not match its declared media type.");
  const sizeLimit = detected.kind === "image" ? env.maxImageSize : env.maxVideoSize;
  if (req.file.size > sizeLimit) return badRequest(`This ${detected.kind} exceeds the configured ${Math.floor(sizeLimit / (1024 * 1024))} MB size limit.`, 413);
  const filename = `${randomUUID()}${detected.ext}`;
  const url = await saveUpload({ env, filename, mimeType: detected.mime, buffer: req.file.buffer });
  return res.status(201).json({ media: { url, mimeType: detected.mime, size: req.file.size, alt: "", title: "" } });
});
