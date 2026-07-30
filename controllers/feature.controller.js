const Feature = require("../models/feature.model");

const createFeature = async (req, res) => {
    try {
        const feature = await Feature.create(req.body);

        res.status(201).json({
            status: "success",
            data: feature,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
const getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.find({}, { __v: 0 });

        res.status(200).json({
            status: "success",
            results: features.length,
            data: features,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
const deleteFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndDelete(req.params.featureId);

        if (!feature) {
            return res.status(404).json({
                status: "fail",
                message: "Feature not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Feature deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
module.exports = {
    createFeature,
    getAllFeatures,
    deleteFeature,
};