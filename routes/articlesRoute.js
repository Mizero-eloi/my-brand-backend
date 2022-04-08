const express = require("express");
const {
  createArticle,
  getAllArticles,
  postImage,
  updateArticle,
  deleteArticle,
  getOneArticle,
  commentArticle,
  likeArticle,
} = require("../controllers/articles");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

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

router.post("/imageUpload/:id", auth, admin, upload.single("image"), postImage);
router.post("/", auth, admin, createArticle);
router.post("/comment/:id", auth, commentArticle);
router.get("/like/:id", auth, likeArticle);
router.put("/:id", auth, admin, updateArticle);
router.delete("/:id", auth, admin, deleteArticle);
router.get("/", getAllArticles);
router.get("/:id", getOneArticle);

module.exports = router;
