const multer = require("multer");

const {
  storageSettings,
  fileFilter,
  fileError,
} = require("../utils/uploadHelpers");

const postCoverSize = 1024 * 1024 * 3;
const allowedType = ["image"];

const storage = multer.diskStorage(
  storageSettings("./uploads/images/profiles", true)
);

const upload = multer({
  storage,
  limits: { fileSize: postCoverSize, files: 1 },
  fileFilter: (req, file, cb) => {
    fileFilter(file, cb, allowedType);
  },
}).single("profileimg");

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    fileError(res, next, error);
  });
};
