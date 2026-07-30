const  mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number
    },
    images: {
    type: [String],
    required: true
    },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
    },
    colors:[String],
    sizes:[String],
    stock:{
        type:Number
    },
},{
    timestamps:true
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;