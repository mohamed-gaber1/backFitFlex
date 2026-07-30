const express = require("express");
const router = express.Router();

const Order = require("../controllers/order.controller");
const validation = require("../middlewares/validation.middleware");
const orderValidation = require('../validation/order.validation');
const authorization =require('../middlewares/authorization.middleware')
const authentication =require('../middlewares/authentication.middleware')
// Create order
router.post(
    "/",
    orderValidation.createOrderValidation,
    validation,
    Order.createOrder
);
// get All order
router.get(
    "/",
    authentication,
    authorization("admin","dev"), 
    validation,
    Order.getAllOrders
);
// get update order
router.patch(
    "/:orderId",
    authentication,
    authorization("admin","dev"), 
    validation,
    Order.updateOrderStatus
);
module.exports = router;