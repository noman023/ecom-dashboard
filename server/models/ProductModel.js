const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    colour: { type: String, required: true },
    condition: { type: String, required: true },
    features: { type: [String], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // Optional fields
    salePrice: Number,
    sku: String,
    negotiation: { type: Boolean, default: false },
    tags: String,
    seoTitle: String,
    seoDescription: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
