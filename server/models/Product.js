import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: [
        "processors",
        "graphics-cards",
        "memory",
        "storage",
        "motherboards",
        "power-supplies",
        "cabinets",
        "cooling",
        "monitors",
      ],
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    description: { type: String, required: true },
    specs: [specSchema],
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", brand: "text", description: "text" });

export default mongoose.model("Product", productSchema);
