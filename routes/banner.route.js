const express = require("express");
const router = express.Router();

const bannerController = require("../controllers/banner.controller");
const validation = require("../middlewares/validation.middleware");
const authentication  = require("../middlewares/authentication.middleware");
const uploadBanner = require("../middlewares/uploadBanner.middleware");
const bannerValidation = require("../validation/banner.validation");

router.post(
    "/",
    authentication,
    uploadBanner.single("image"),
    bannerValidation.createBannerValidation,
    validation,
    bannerController.createBanner
);

router.get("/", bannerController.getAllBanners);


router.delete(
    "/:bannerId",
    authentication,
    bannerController.deleteBanner
);

module.exports = router;
