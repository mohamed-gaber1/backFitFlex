const Order = require("../models/order.model");
const Product = require("../models/product.model");

const createOrder = async (req,res)=>{
    try{
        const {customerName,phone,address,items} = req.body;
        let totalPrice=0;
        let orderItems=[];
        for(const item of items){
            const product=await Product.findById(item.product);
            if(!product){
                return res.status(404).json({
                    status: "fail",
                    message: "Product not found",
                })
            }
            if(!product.sizes.includes(item.size)){
                return res.status(404).json({
                    status: "fail",
                    message: "Invalid size",
                })
            }
            if(!product.colors.includes(item.color)){
                return res.status(404).json({
                    status: "fail",
                    message: "Invalid color",
                })
            }
            if(product.stock < item.quantity){
                return res.status(400).json({
                    status: "fail",
                    message: "Not enough stock",
                })
            }
            const itemPrice=product.price * item.quantity;
            totalPrice += itemPrice;
            orderItems.push({
                product: product._id,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
                price: product.price,
            });
        }
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            product.stock -= item.quantity;
            await product.save();
        }
        const order = await Order.create({
            customerName,
            phone,
            address,
            items: orderItems,
            totalPrice,
        });
        res.status(201).json({
            status:"success",
            data:order
        })
    
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};
const getAllOrders= async (req,res)=>{
    try{

        const query=req.query;
        const page=Number(query.page)||1;
        const limit=Number(query.limit)||10;
        const skip=(page-1)*limit;
        const orders=await Order.find({},{'__v':0}).populate("items.product", "name price images").limit(limit).skip(skip);
        res.status(200).json({
            status:"success",
            results: orders.length,
            data:orders
        });
    }catch(err){
        res.status(500).json({
            status:"error",
            message: err.message
        })
    }
};
const updateOrderStatus= async (req,res)=>{
    try{
        const { status } = req.body;
        const validStatus = [
            "Pending",
            "Shipped",
            "Completed",
            "Cancelled",
        ];
        if(!validStatus.includes(status)){
            return res.status(400).json({
                status:"fail",
                message:"Invalid status"
            })
        }
        const order=await Order.findByIdAndUpdate(
            req.params.orderId,
            {status},
            {new:true}
        )
        if(!order){
            return res.status(404).json({
                status:"fail",
                message:"order not found"
            })
        }
        res.status(200).json({
            status:"success",
            data:order
        });
    }catch(err){
        res.status(500).json({
            status:"error",
            message: err.message
        })
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus
};