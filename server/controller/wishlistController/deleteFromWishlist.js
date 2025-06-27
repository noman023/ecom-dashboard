const WishlistModel = require("../../models/WishlistModel");

async function deleteFromWishlist(req, res) {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const wishlist = await WishlistModel.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter((id) => id.toString() !== productId);
    await wishlist.save();

    res.json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { deleteFromWishlist };
