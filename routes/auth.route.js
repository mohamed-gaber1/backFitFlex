const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication.middleware");
const authController = require("../controllers/auth.controller");
const { loginValidation } = require("../validation/auth.validation");

router.post("/login", loginValidation, authController.login);
router.patch(
    "/change-password",
    authentication,
    authController.changePassword
);
module.exports = router;