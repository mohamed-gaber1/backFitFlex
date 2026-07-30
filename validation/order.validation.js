const {body}=require('express-validator');

const createOrderValidation=[
    body("customerName")
        .notEmpty()
        .withMessage("Customer name is required")
        .trim(),
    body("phone")
        .notEmpty()
        .withMessage("Phone is required")
        .trim(),
    body("address")
        .notEmpty()
        .withMessage("Address is required"),
    body("items")
        .isArray({min:1})
        .withMessage("Items are required"),
    body("items.*.product")
        .notEmpty()
        .withMessage("Product is required")
        .isMongoId()
        .withMessage("Invalid product id"),
    body("items.*.size")
        .notEmpty()
        .withMessage("Size is required"),
    body("items.*.color")
        .notEmpty()
        .withMessage("Color is required"),
    body("items.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

]
module.exports = {
    createOrderValidation,
};
// const { body } = require("express-validator");

// const createOrderValidation = [
//     body("customerName")
//         .notEmpty()
//         .withMessage("Customer name is required"),
// ];

// module.exports = {
//     createOrderValidation,
// };