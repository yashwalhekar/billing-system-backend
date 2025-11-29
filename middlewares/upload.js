import multer from "multer";

const storage = multer.memoryStorage(); //here we upload buffer to cloudinary
const upload = multer({ storage });

export default upload;
