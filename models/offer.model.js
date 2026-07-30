const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        discountType: {
            type: String,
            enum: ["percentage", "fixed", "text"],
        },
        discountValue: {
            type: Number,
            default: null,
        },
        cardColor: {
            type: String,
            enum: [
                "#8B5CF6", 
                "#3498DB", 
                "#2ECC71",
                "#E74C3C", 
                "#D4B06A", 
            ],
            default: "#D4B06A",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Offer", offerSchema);