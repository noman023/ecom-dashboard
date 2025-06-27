const express = require("express");
const router = express.Router();
const { addToCart } = require("../controller/cartController/addToCart");
const { authenticateUser } = require("../middleware/authMiddlware");
const { getCartItems } = require("../controller/cartController/getCartItems");
const {
  deleteCartItem,
} = require("../controller/cartController/deleteCartItem");

router
  .get("/", authenticateUser, getCartItems)
  .post("/add", authenticateUser, addToCart)
  .delete("/delete", authenticateUser, deleteCartItem);
module.exports = router;
