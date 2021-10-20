const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  createProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/productControllers");

// Getting all products
router.get("/", getAllProduct);

// Creating a product
router.post("/", createProduct);

// Getting a product by id
router.get("/:id", getOneProduct);

// Update a product by id
router.patch("/:id", updateOneProduct);

// Delete a product by id
router.delete("/:id", deleteOneProduct);

module.exports = router;
