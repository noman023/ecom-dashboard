const OrderModel = require("../../models/OrderModel");

async function getOrderById(req, res) {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("items.product")
      .populate("buyer", "name email");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getOrderById };
