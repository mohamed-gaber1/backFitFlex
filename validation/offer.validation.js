const { body } = require("express-validator");

const createOfferValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .trim(),

    body("description")
        .trim(),

    body("discountType")
        .isIn(["percentage", "fixed", "text"])
        .withMessage("Invalid discount type"),

    body("discountValue")
        .if(body("discountType").not().equals("text"))
        .isNumeric()
        .withMessage("Discount value must be a number"),

    body("cardColor")
        .optional()
        .isIn([
            "#8B5CF6",
            "#3498DB",
            "#2ECC71",
            "#E74C3C",
            "#D4B06A",
        ])
        .withMessage("Invalid card color"),
];

module.exports = {
    createOfferValidation,
};