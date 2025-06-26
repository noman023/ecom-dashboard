const Product = require("../../models/ProductModel");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllProducts };