const Cart = require("../../models/CartModel");

async function deleteCartItem(req, res) {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { deleteCartItem };
