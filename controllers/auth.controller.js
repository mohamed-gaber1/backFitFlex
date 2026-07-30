const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const login = async (req, res) => {
    try{

        const { role, password } = req.body;
        const user = await User.findOne({ role });
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid password",
            });
        }
        const token = jwt.sign(
            { role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({
            status: "success",
            token,
        });
    }catch(err){
        return res.status(500).json({
            status:"error",
            message:err.message
        })
    }
};
const changePassword = async (req, res) => {
    try {
        const { role, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ role });

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        // الـ Admin لا يستطيع تغيير باسورد الـ Dev
        if (req.user.role === "admin" && role !== "admin") {
            return res.status(403).json({
                status: "fail",
                message: "Forbidden",
            });
        }

        // هل لازم oldPassword؟
        const isDevChangingAdmin =
            req.user.role === "dev" && role === "admin";

        if (!isDevChangingAdmin && !oldPassword) {
            return res.status(400).json({
                status: "fail",
                message: "Old password is required",
            });
        }
        // لو مش Dev بيغير باسورد Admin لازم يتأكد من الباسورد القديمة
        if (!isDevChangingAdmin) {
            const isMatch = await bcrypt.compare(
                oldPassword,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    status: "fail",
                    message: "Current password is incorrect",
                });
            }
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashPassword;

        await user.save();

        return res.status(200).json({
            status: "success",
            message: "Password changed successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
module.exports = {
    login,
    changePassword
};