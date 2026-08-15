const Product = require("../models/product.model");
const Category = require("../models/category.model");
const cloudinary = require("../config/cloudinary");

// Extract Cloudinary public_id from the stored image URL
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

        let publicId = url.pathname.substring(uploadIndex + "/upload/".length);

        // Remove version such as v123456789/
        publicId = publicId.replace(/^v\d+\//, "");

        // Remove file extension
        publicId = publicId.replace(/\.[^/.]+$/, "");

        return publicId;
    } catch (err) {
        console.log("Cannot extract Cloudinary public_id:", err.message);
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

        console.log(`Cloudinary delete: ${publicId}`, result.result);
    } catch (err) {
        console.log(
            `Cannot delete image from Cloudinary: ${imageUrl}`,
            err.message
        );
    }
};


// Create Product
const createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found",
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Please upload at least one image",
            });
        }

        // Cloudinary returns the uploaded image URL in file.path
        const images = req.files.map((file) => file.path);

        req.body.images = images;

        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({
            status: "success",
            data: newProduct,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


// Get Products
const getProducts = async (req, res) => {
    try {
        const query = req.query;

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (query.category) {
            filter.category = query.category;
        }

        const products = await Product.find(filter, { __v: 0 })
            .populate("category", "name")
            .limit(limit)
            .skip(skip);

        if (products.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No products found",
            });
        }

        res.status(200).json({
            status: "success",
            results: products.length,
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


// Get Product by Id
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    try {
        const oldProduct = await Product.findById(req.params.productId);

        if (!oldProduct) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        // Validate category if it was changed
        if (req.body.category) {
            const category = await Category.findById(req.body.category);

            if (!category) {
                return res.status(404).json({
                    status: "fail",
                    message: "Category not found",
                });
            }
        }

        // Existing images sent by frontend
        let existingImages = req.body.existingImages || [];

        if (!Array.isArray(existingImages)) {
            existingImages = [existingImages];
        }

        // New images uploaded to Cloudinary
        const newImages = req.files
            ? req.files.map((file) => file.path)
            : [];

        /*
         * Delete old Cloudinary images that are no longer included.
         *
         * Example:
         *
         * Old:
         * [image1, image2]
         *
         * User keeps image1 and adds image3:
         *
         * existingImages = [image1]
         * newImages = [image3]
         *
         * image2 will be deleted from Cloudinary.
         */
        for (const oldImage of oldProduct.images) {
            if (!existingImages.includes(oldImage)) {
                await deleteCloudinaryImage(oldImage);
            }
        }

        // Final images
        req.body.images = [
            ...existingImages,
            ...newImages,
        ];

        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        // Delete all product images from Cloudinary
        for (const image of product.images) {
            await deleteCloudinaryImage(image);
        }

        // Delete product from MongoDB
        await Product.findByIdAndDelete(req.params.productId);

        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};