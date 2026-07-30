const  mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            size: {
                type: String,
                required: true,
            },

            color: {
                type: String,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
            },

            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Shipped",
            "Completed",
            "Cancelled",
        ],
        default: "Pending",
    },
},
{
    timestamps: true,
}
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;