const Banner = require("../models/banner.model");
const cloudinary = require("../config/cloudinary");

// Extract Cloudinary public_id from image URL
const getCloudinaryPublicId = (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.startsWith("http")) {
            return null;
        }

        const url = new URL(imageUrl);
        const uploadIndex = url.pathname.indexOf("/upload/");

        if (uploadIndex === -1) {
            return null;
        }

        let publicId = url.pathname.substring(
            uploadIndex + "/upload/".length
        );

        // Remove Cloudinary version
        publicId = publicId.replace(/^v\d+\//, "");

        // Remove file extension
        publicId = publicId.replace(/\.[^/.]+$/, "");

        return publicId;
    } catch (err) {
        console.log(
            "Cannot extract Cloudinary public_id:",
            err.message
        );

        return null;
    }
};

// Delete image from Cloudinary
const deleteCloudinaryImage = async (imageUrl) => {
    try {
        const publicId = getCloudinaryPublicId(imageUrl);

        if (!publicId) {
            return;
        }

        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
        });

        console.log(
            `Cloudinary delete: ${publicId}`,
            result.result
        );
    } catch (err) {
        console.log(
            "Cannot delete banner image from Cloudinary:",
            err.message
        );
    }
};


// Create Banner
const createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "fail",
                message: "Please upload a banner image",
            });
        }

        // Cloudinary image URL
        req.body.image = req.file.path;

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


// Get All Banners
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


// Delete Banner
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.bannerId);

        if (!banner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found",
            });
        }

        // Delete image from Cloudinary
        if (banner.image) {
            await deleteCloudinaryImage(banner.image);
        }

        // Delete banner from MongoDB
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