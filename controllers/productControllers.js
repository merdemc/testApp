const createError = require("http-errors");
const mongoose = require("mongoose");

const Product = require("../models/productModel");


// Getting all products
const getAllProduct = async (req, res, next) => {
  try {
    const results = await Product.find({}, { __v: 0 }); // We do not want to get __v values
    // const results = await Product.find({},{name:1,price:1,_id:0}); // We want to get values then set as "1"
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

// Creating a product
const createProduct = async (req, res, next) => {
  // Saving data with async functions
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);

    if (error.name === "ValidationError") {
      next(createError(422, error.message));
    }
    next(error);
  }

  /*   // Saving data with Promise
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.send(product);
    })
    .catch((error) => {
      console.log(error.message);
    }); */
};

// Getting a product by id
const getOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    //const result = await Product.findOne({_id:id}) // Another method to get a one product
    //const result = await Product.find({_id:id}, { __v: 0 }); // Another method to get a one product
    //const results = await Product.find({},{name:1,price:1,_id:0}); // We want to get values then set as "1"
    if (!product) {
      throw createError(404, "There is no product ");
    }

    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(error); // It wil pass error to te error handler middleware in app.js
  }
};

// Update a product by id
const updateOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true }; // If we pass options otherwise findByIdAndUpdate return old document
    const product = await Product.findByIdAndUpdate(id, updates, options);
    if (!product) {
      throw createError(404, "There is no product ");
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(error); // It wil pass error to te error handler middleware in app.js
  }
};

// Delete a product by id
const deleteOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw createError(404, "There is no product ");
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(error); // It wil pass error to te error handler middleware in app.js
  }
};





module.exports = {
    getAllProduct,
    createProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct,
}