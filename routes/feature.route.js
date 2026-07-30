const express = require("express");
const router = express.Router();

const featureController = require("../controllers/feature.controller");
const validation = require("../middlewares/validation.middleware");
const authentication = require("../middlewares/authentication.middleware");
const featureValidation = require("../validation/feature.validation");

router.post(
    "/",
    authentication,
    featureValidation.createFeatureValidation,
    validation,
    featureController.createFeature
);

router.get(
    "/",
    featureController.getAllFeatures
);

router.delete(
    "/:featureId",
    authentication,
    featureController.deleteFeature
);

module.exports = router;