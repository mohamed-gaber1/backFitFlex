require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/user.model");
const seed = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    const adminExists = await User.findOne({
        role: "admin",
    });
    if (!adminExists) {
        const hashPassword = await bcrypt.hash("123456", 10);
        await User.create({
            role: "admin",
            password: hashPassword,
        });
    }
    const devExists = await User.findOne({
        role: "dev",
    });
    if (!devExists) {
        const hashPassword = await bcrypt.hash("123456", 10);
        await User.create({
            role: "dev",
            password: hashPassword,
        });
    }
    console.log("Seed completed");
    process.exit();
};
seed();