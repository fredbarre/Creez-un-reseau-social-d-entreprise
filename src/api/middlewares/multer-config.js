import multer from "multer";
import fs from "fs";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
await fs.promises.mkdir("./images").catch((err) => console.warn(err));
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "." + extension);
  },
});
const multerMW = multer({ storage: storage }).single("image");
export default multerMW;
