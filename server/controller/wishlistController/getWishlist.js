const WishlistModel = require("../../models/WishlistModel");

async function getWishlist(req, res) {
  try {
    const userId = req.user._id;
    const wishlist = await WishlistModel.findOne({ user: userId }).populate(
      "items"
    );
    res.json({ items: wishlist ? wishlist.items : [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getWishlist };
