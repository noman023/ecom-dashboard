const express = require("express");
const router = express.Router();
const {
  addOrder,
} = require("../controller/cartController/orderController/addOrder");
const { authenticateUser } = require("../middleware/authMiddlware");

router.post("/create", authenticateUser, addOrder);

module.exports = router;
