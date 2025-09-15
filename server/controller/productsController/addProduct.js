const Product = require("../../models/ProductModel");

async function addProduct(req, res) {
  try {
    const {
      title,
      description,
      category,
      brand,
      color,
      price,
      wholesalePrice,
      quantity,
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
      color,
      price,
      wholesalePrice,
      quantity,
      seller: req.user?._id,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addProduct };
