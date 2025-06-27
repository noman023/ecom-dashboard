const OrderModel = require("../../models/OrderModel");

// controller
async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { updateOrderStatus };
