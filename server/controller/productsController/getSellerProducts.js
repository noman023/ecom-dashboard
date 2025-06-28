const Product = require("../../models/ProductModel");

async function getSellerProducts(req, res) {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getSellerProducts };
