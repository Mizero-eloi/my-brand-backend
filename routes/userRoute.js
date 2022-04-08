const express = require("express");
const { getAllUsers, getOneUser } = require("../controllers/usersController");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, admin, getAllUsers);
router.get("/:id", auth, admin, getOneUser);

module.exports = router;
