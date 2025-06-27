const Wishlist = require("../../models/WishlistModel");

async function addToWishlist(req, res) {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    // Prevent duplicate
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }

    res.json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addToWishlist };
