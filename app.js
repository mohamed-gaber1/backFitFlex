const express=require('express');
const cors = require("cors");
const path = require("path");
const app=express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoute = require("./routes/auth.route");
const categoryRouter=require('./routes/categories.routes');
const productRouter=require('./routes/products.routes');
const orderRouter=require('./routes/order.route');
const offerRouter = require("./routes/offer.route");
const bannerRouter = require("./routes/banner.route");
const settingsRouter = require("./routes/settings.route");
const featureRouter = require("./routes/feature.route");
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRouter);
app.use("/api/banners", bannerRouter);
app.use("/api/offers", offerRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/features", featureRouter);

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

module.exports=app;