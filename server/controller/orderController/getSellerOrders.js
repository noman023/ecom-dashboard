const Order = require("../../models/OrderModel");

async function getSellerOrders(req, res) {
  try {
    const sellerId = req.user._id;

    // 1. Get all orders, populate product
    const orders = await Order.find()
      .populate({
        path: "items.product",
        select: "title seller", // add other fields as needed
      })
      .populate("buyer", "name email") // if you want buyer info
      .sort({ createdAt: -1 });

    // 2. Filter orders that have at least one item for this seller
    const sellerOrders = orders.filter((order) =>
      order.items.some(
        (item) =>
          item.product &&
          item.product.seller?.toString() === sellerId.toString()
      )
    );

    res.json({ orders: sellerOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getSellerOrders };
