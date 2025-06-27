const Order = require("../../../models/OrderModel");

async function addOrder(req, res) {
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
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addOrder };
