import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

console.log("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("multerdestination");
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    console.log("multerfile", file);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "." + extension);
  },
});
const multerMW = multer({ storage: storage }).single("image");
export default multerMW;
