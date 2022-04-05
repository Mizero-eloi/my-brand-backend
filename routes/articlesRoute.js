const express = require("express");
const { createArticle } = require("../controllers/articles");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, admin, createArticle);

module.exports = router;
