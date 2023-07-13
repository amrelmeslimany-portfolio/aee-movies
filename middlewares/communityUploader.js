const multer = require("multer");

const {
  storageSettings,
  fileFilter,
  fileError,
} = require("../utils/uploadHelpers");

const postCoverSize = 1024 * 1024 * 3;
const allowedType = ["video", "image"];

const storage = multer.diskStorage(storageSettings());

const upload = multer({
  storage,
  limits: { fileSize: postCoverSize, files: 1 },
  fileFilter: (req, file, cb) => {
    fileFilter(file, cb, allowedType);
  },
}).single("postIMG");

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    fileError(res, next, error);
  });
};
