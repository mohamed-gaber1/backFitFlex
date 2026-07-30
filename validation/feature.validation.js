const { body } = require("express-validator");

const createFeatureValidation = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .trim(),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .trim(),
];

module.exports = {
    createFeatureValidation,
};