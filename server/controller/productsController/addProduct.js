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

    // Handle image (Cloudinary returns URL in req.file)
    let image = null;
    if (req.file) {
      image = req.file.path; // Cloudinary returns URL in file.path
    }

    const product = new Product({
      title,
      description,
      image,
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
