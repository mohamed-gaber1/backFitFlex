const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offer.controller");
const authentication = require("../middlewares/authentication.middleware");
const validation = require("../middlewares/validation.middleware");
const offerValidation = require("../validation/offer.validation");

router.post(
    "/",
    authentication,
    offerValidation.createOfferValidation,
    validation,
    offerController.createOffer
);

router.get("/", offerController.getAllOffers);

router.patch(
    "/:offerId",
    authentication,
    offerValidation.createOfferValidation,
    validation,
    offerController.updateOffer
);

router.delete(
    "/:offerId",
    authentication,
    offerController.deleteOffer
);

module.exports = router;