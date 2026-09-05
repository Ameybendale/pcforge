import Product from "../models/Product.js";

// GET /api/products?category=&search=&sort=&page=&limit=
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 12, featured } = req.query;
    const query = {};

    if (category) query.category = category;
    if (featured) query.featured = featured === "true";
    if (search) query.$text = { $search: search };

    let sortBy = { createdAt: -1 };
    if (sort === "price-asc") sortBy = { price: 1 };
    if (sort === "price-desc") sortBy = { price: -1 };
    if (sort === "rating") sortBy = { rating: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortBy)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/categories/summary
export const getCategorySummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/products  (admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/products/:id  (admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/products/:id  (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
