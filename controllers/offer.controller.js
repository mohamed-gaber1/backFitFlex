const Offer = require("../models/offer.model");

const createOffer = async (req, res) => {
    try {
        const offer = await Offer.create(req.body);

        res.status(201).json({
            status: "success",
            data: offer,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({}, { __v: 0 });

        res.status(200).json({
            status: "success",
            results: offers.length,
            data: offers,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.offerId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!offer) {
            return res.status(404).json({
                status: "fail",
                message: "Offer not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: offer,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.offerId);

        if (!offer) {
            return res.status(404).json({
                status: "fail",
                message: "Offer not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Offer deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

module.exports = {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer,
};