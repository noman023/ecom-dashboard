const Product = require("../../models/ProductModel");

async function addProduct(req, res) {
  try {
    const {
      title,
      description,
      category,
      brand,
      model,
      storage,
      ram,
      colour,
      condition,
      features,
      price,
      salePrice,
      quantity,
      sku,
      negotiation,
      tags,
      seoTitle,
      seoDescription,
    } = req.body;

    // Handle images (multer saves files in req.files)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.filename);
    }

    const product = new Product({
      title,
      description,
      images,
      category,
      brand,
      model,
      storage,
      ram,
      colour,
      condition,
      features: features ? Array.isArray(features) ? features : [features] : [],
      price,
      salePrice,
      quantity,
      sku,
      negotiation,
      tags,
      seoTitle,
      seoDescription,
      seller: req.user?._id, // if using auth middleware
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addProduct };