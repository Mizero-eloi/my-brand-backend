const express = require("express");
const {
  postContactMeMessage,
  getAllMeMessages,
} = require("../controllers/contactMeMessage");
const router = express.Router();

router.post("/", postContactMeMessage);
router.get("/", getAllMeMessages);
module.exports = router;
