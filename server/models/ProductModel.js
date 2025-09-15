const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "electronics",
        "clothing",
        "home-garden",
        "food-beverages",
        "health-beauty",
        "sports-outdoors",
        "books-media",
        "toys-games",
        "automotive",
        "office-supplies",
      ],
    },
    brand: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    wholesalePrice: { type: Number },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
