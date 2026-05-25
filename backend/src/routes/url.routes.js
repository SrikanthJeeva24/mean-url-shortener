const express = require("express");

const router = express.Router();

const {
  createShortURL,
  redirectURL,
  getAllURls,
} = require("../controllers/url.controller");

router.get("/", getAllURls);
router.post("/", createShortURL);
router.get("/:shortCode", redirectURL);

module.exports = router;
