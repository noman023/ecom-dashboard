const Product = require("../../models/ProductModel");

async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { editProduct };