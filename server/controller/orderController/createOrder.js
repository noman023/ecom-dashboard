const Order = require("../../models/OrderModel");
const Cart = require("../../models/CartModel");

async function createOrder(req, res) {
  try {
    const userId = req.user._id;
    const {
      items,
      shippingMethod,
      paymentMethod,
      promo,
      total,
      name,
      phone,
      address,
      city,
      state,
      zip,
      country,
    } = req.body;

    const order = new Order({
      buyer: userId,
      items,
      shippingMethod,
      paymentMethod,
      promo,
      total,
      shippingAddress: { name, phone, address, city, state, zip, country },
      status: "Pending",
    });

    await order.save();

    // Remove ordered items from cart
    const productIds = items.map((item) => item.product.toString());
    await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: { $in: productIds } } } }
    );

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOrder };
