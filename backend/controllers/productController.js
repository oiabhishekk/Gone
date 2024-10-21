import Product from "./../models/productModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;

    if (!name) {
      return res.status(400).json({ error: "Name is Required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Description is Required" });
    }
    if (!price) {
      return res.status(400).json({ error: "Price is Required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is Required" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Quantity is Required" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Brand is Required" });
    }
    if (!image) {
      return res.status(400).json({ error: "Image is Required" });
    }
    const newProduct = new Product({ ...req.fields });
    console.log(newProduct);
    await newProduct.save();
    res.status(200).json({ success: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyWord = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments(keyWord);
    const products = await Product.find(keyWord).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
    console.log(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.fields, req.params);

  try {
    const { name, description, price, category, quantity, brand, image } =
      req.fields;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is Required" });
    }
    if (!name) {
      return res.status(400).json({ error: "Name is Required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Description is Required" });
    }
    if (!price) {
      return res.status(400).json({ error: "Price is Required" });
    }
    if (!category) {
      return res.status(400).json({ error: "Category is Required" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Quantity is Required" });
    }
    if (!brand) {
      return res.status(400).json({ error: "Brand is Required" });
    }
    if (!image) {
      return res.status(400).json({ error: "Image is Required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, quantity, brand, image },
      { new: true, runValidators: true }
    );

    console.log(updatedProduct);
    await updatedProduct.save();
    res.status(200).json({ success: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is Required" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.status(200).json({ success: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const fetchProductsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.json({ error: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  fetchProductsById,
  getAllProducts,
};
