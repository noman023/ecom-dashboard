const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddlware");
const { createOrder } = require("../controller/orderController/createOrder");
const { getOrders } = require("../controller/orderController/getOrders");
const {
  getSellerOrders,
} = require("../controller/orderController/getSellerOrders");
const {
  updateOrderStatus,
} = require("../controller/orderController/updateOrderStatus");
const { getOrderById } = require("../controller/orderController/getOrderById");

router
  .post("/create", authenticateUser, createOrder)
  .get("/", authenticateUser, getOrders)
  .get("/seller", authenticateUser, getSellerOrders)
  .get("/:id", authenticateUser, getOrderById)
  .patch("/:id/status", authenticateUser, updateOrderStatus);

module.exports = router;
