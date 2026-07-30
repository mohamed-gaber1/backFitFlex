const Product = require('../models/product.model');
const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");

const createProduct = async (req,res)=>{
    try{
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: "fail",
                message: "Please upload at least one image"
            });
        }
        const images = req.files.map(file => file.filename);
        req.body.images = images;
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({
            status:"success",
            data:newProduct
        })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};
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
                message: "No products found"
            });
        }
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
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
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: product
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


const updateProduct=async(req,res)=>{
    try{
        const oldProduct = await Product.findById(req.params.productId);

        if (!oldProduct) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }
        if (req.body.category) {
            const category = await Category.findById(req.body.category);
            if (!category) {
                return res.status(404).json({
                    status: "fail",
                    message: "Category not found"
                });
            }
        }
        let existingImages = req.body.existingImages || [];

        if (!Array.isArray(existingImages)) {
            existingImages = [existingImages];
        }
        const newImages = req.files
            ? req.files.map(file => file.filename)
            : [];
            for (const image of oldProduct.images) {

                if (!existingImages.includes(image)) {
                
                    const imagePath = path.join(
                        __dirname,
                        "..",
                        "uploads",
                        "products",
                        image
                    );
                
                    try {
                        await fs.promises.unlink(imagePath);
                    } catch (err) {
                        console.log("Cannot delete", image);
                    }
                
                }
            
            }
            req.body.images = [
                ...existingImages,
                ...newImages
            ];
        const product = await Product.findByIdAndUpdate(req.params.productId,req.body,{returnDocument: "after",runValidators: true})
        if(!product){
            return res.status(404).json({
                status:"fail",
                message: "Product not found"
            })
        }
        res.status(200).json({
                    status:"success",
                    data:product
                });
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
};

const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }

        for (const image of product.images) {
            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                "products",
                image
            );

            try {
                await fs.promises.unlink(imagePath);
            } catch (err) {
                console.log(`Cannot delete ${image}`);
            }
        }
        await Product.findByIdAndDelete(req.params.productId);

        res.status(200).json({
            status: "success",
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};