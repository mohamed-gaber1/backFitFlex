const { body } = require("express-validator");

const updateSettingsValidation = [
    body("storeName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Store name cannot be empty"),

    body("whatsapp")
        .optional()
        .trim(),

    body("facebook")
        .optional()
        .trim(),

    body("instagram")
        .optional()
        .trim(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),
];

module.exports = {
    updateSettingsValidation,
};