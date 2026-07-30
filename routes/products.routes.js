const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const product = require("../controllers/products.controller");
const validation = require("../middlewares/validation.middleware");
const uploadProduct  = require("../middlewares/uploadProduct.middleware");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");
// Create Product
router.post(
    "/",
    authentication,
    authorization("admin","dev"),
    uploadProduct.array("images", 10),

    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be greater than or equal to 0"),

    validation,

    product.createProduct
);

// Get All Products
router.get("/", product.getProducts);
// get one product by id
router.get("/:productId", product.getProduct);
// Update Product
router.patch(
    "/:productId",
    authentication,
    authorization("admin","dev"),
    uploadProduct.array("images", 10),

    body("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("price")
        .optional()
        .isNumeric()
        .withMessage("Price must be a number"),

    body("category")
        .optional()
        .notEmpty()
        .withMessage("Category is required"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be greater than or equal to 0"),

    validation,

    product.updateProduct
);

// Delete Product
router.delete("/:productId",authentication,authorization("admin","dev"), product.deleteProduct);

module.exports = router;