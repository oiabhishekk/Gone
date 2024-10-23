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
// const addProductReview = asyncHandler(async (req, res) => {
//   try {
//     const productId = req.params.productid;
//     console.log(productId);
//     const product = await Product.findById(productId);
//     if (!product) {
//       res.status(400);
//       throw new Error("No product found");
//     }
//     console.log(product);

//     // if product is already reviewed
//     const reviewedProduct = product.reviews.find(
//       (r) => r?.user.toString() === req.user._id.toString()
//     );
//     if (reviewedProduct) {
//       res.status(400);
//       throw new Error("Product already reviewed.");
//     } else {
//       const { rating, comment } = req.body;
//       const review = {
//         name: req.user.username,
//         rating: Number(rating),
//         comment: comment,
//         user: req.user._id,
//       };
//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       //calc rating
//       product.rating =
//         product.reviews.reduce((acc, review) => {
//           return review.rating + acc;
//         }, 0) / product.numReviews;
//       console.log(product.rating);
//       await product.save();
//       res.status(200).json(product);
//     }

//     console.log(reviewedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productid;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "No product found." });
    }

    // Check if the user has already reviewed the product
    const reviewedProduct = product.reviews.find(
      (r) => r?.user.toString() === req.user._id.toString()
    );

    if (reviewedProduct) {
      return res.status(400).json({ message: "Product already reviewed." });
    }

    const { rating, comment } = req.body;

    // Input validation
    if (!rating || rating < 1 || rating > 5 || !comment) {
      return res.status(400).json({ message: "Invalid rating or comment." });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // Add review to the product
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // Calculate new average rating
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.numReviews;

    await product.save();

    // Return relevant fields
    res.status(200).json({
      _id: product._id,
      name: product.name,
      rating: product.rating,
      numReviews: product.numReviews,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(4);
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
  addProductReview,
  getTopProducts,
  getNewProducts,
};
