const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settings.controller");
const authentication = require("../middlewares/authentication.middleware");
const validation = require("../middlewares/validation.middleware");
const settingsValidation = require("../validation/settings.validation");

router.get("/", settingsController.getSettings);

router.patch(
    "/",
    authentication,
    settingsValidation.updateSettingsValidation,
    validation,
    settingsController.updateSettings
);

module.exports = router;