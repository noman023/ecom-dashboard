const Order = require("../../models/OrderModel");

async function getOrders(req, res) {
  try {
    const userId = req.user._id;
    // Get all orders for the logged-in user, most recent first
    const orders = await Order.find({ buyer: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getOrders };
