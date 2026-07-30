const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const loginValidation = [
    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["admin", "dev"])
        .withMessage("Role must be admin or dev"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    validationMiddleware,
];
const changePasswordValidation = [
    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["admin", "dev"])
        .withMessage("Invalid role"),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
module.exports = {
    loginValidation,
    changePasswordValidation
};