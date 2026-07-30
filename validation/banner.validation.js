const { body } = require("express-validator");

const createBannerValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .trim(),

    body("subtitle")
        .notEmpty()
        .withMessage("Subtitle is required")
        .trim(),

    body("backgroundColor")
        .optional()
        .trim(),
];

module.exports = {
    createBannerValidation,
};