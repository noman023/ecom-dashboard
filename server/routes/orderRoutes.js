const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddlware");
const { createOrder } = require("../controller/orderController/createOrder");
const { getOrders } = require("../controller/orderController/getOrders");

router
  .post("/create", authenticateUser, createOrder)
  .get("/", authenticateUser, getOrders);

module.exports = router;
