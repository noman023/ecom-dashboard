const express = require("express");
const router = express.Router();
const {
  addToWishlist,
} = require("../controller/wishlistController/addToWishlist");
const { authenticateUser } = require("../middleware/authMiddlware");
const {
  deleteFromWishlist,
} = require("../controller/wishlistController/deleteFromWishlist");
const { getWishlist } = require("../controller/wishlistController/getWishlist");

router.post("/add", authenticateUser, addToWishlist);
router.get("/", authenticateUser, getWishlist);
router.delete("/delete", authenticateUser, deleteFromWishlist);

module.exports = router;
