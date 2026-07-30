const Banner = require("../models/banner.model");
const fs = require("fs");
const path = require("path");

const createBanner = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }

        const banner = await Banner.create(req.body);

        res.status(201).json({
            status: "success",
            data: banner,
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
const getAllBanners = async (req, res) => {
    try {

        const banners = await Banner.find({}, { __v: 0 });

        res.status(200).json({
            status: "success",
            results: banners.length,
            data: banners,
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
const deleteBanner = async (req, res) => {
    try {

        const banner = await Banner.findById(req.params.bannerId);

        if (!banner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found",
            });
        }

        if (banner.image) {
            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                "banners",
                banner.image
            );

            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.log("Cannot delete banner image");
            }
        }

        await Banner.findByIdAndDelete(req.params.bannerId);

        res.status(200).json({
            status: "success",
            message: "Banner deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
module.exports = {
    createBanner,
    getAllBanners,
    deleteBanner,
};