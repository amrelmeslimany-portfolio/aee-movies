const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storageSettings = (
  uploadPath = "./uploads/images/community",
  removeOld = false
) => {
  return {
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadPath))
        fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileType = file.mimetype.includes("image") ? "img" : "video";
      let filename;

      if (removeOld) {
        if (
          fs.existsSync(req.user.profile) &&
          !req.user.profile.endsWith("userprofile.png")
        ) {
          fs.unlinkSync(req.user.profile);
        }
        filename = `${req.user._id}_${Date.now()}${path.extname(
          file.originalname
        )}`;
      } else {
        filename = `${fileType}_amr_${Date.now()}${path.extname(
          file.originalname
        )}`;
      }

      cb(null, filename);
    },
  };
};

const fileFilter = (file, cb, allowedType) => {
  if (allowedType.includes(file.mimetype.split("/")[0])) cb(null, true);
  else cb(new Error("ليس مسموح برفع هذا الملف"), false);
};

const fileError = function (res, next, error) {
  if (error instanceof multer.MulterError) {
    if (error.code == "LIMIT_FILE_SIZE") {
      error.message = "حجم الملف كبير, لازم ميزدش عن 3 ميجابايت";
    }
    return res.status(400).json({ message: error.message });
  } else if (error) return res.status(400).json({ message: error.message });

  next();
};

module.exports = {
  storageSettings,
  fileFilter,
  fileError,
};
