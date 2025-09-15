const Product = require("../../models/ProductModel");

async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle image if new one is uploaded (Cloudinary returns URL)
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary returns URL in file.path
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { editProduct };
