const Cart = require("../../models/CartModel");

async function getCartItems(req, res) {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      populate: {
        path: "seller",
        select: "name _id",
      },
    });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getCartItems };
