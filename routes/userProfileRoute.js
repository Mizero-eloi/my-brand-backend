const express = require("express");
const {
  userProfile,
  userProfilePicture,
} = require("../controllers/userProfile");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    return cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 20 MBs
  },
  fileFilter: filter,
});

router.put("/:id", auth, userProfile);
router.put("/image/:id", auth, upload.single("profile"), userProfilePicture);

module.exports = router;
