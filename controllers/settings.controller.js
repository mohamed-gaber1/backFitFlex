const Setting = require("../models/setting.model");
const getSettings = async (req, res) => {
    try {

        let setting = await Setting.findOne();

        if (!setting) {
            setting = await Setting.create({});
        }

        res.status(200).json({
            status: "success",
            data: setting
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
const updateSettings = async (req, res) => {
    try {

        let setting = await Setting.findOne();

        if (!setting) {
            setting = await Setting.create({});
        }

        setting.storeName = req.body.storeName ?? setting.storeName;

        setting.socialLinks.whatsapp =
            req.body.whatsapp ?? setting.socialLinks.whatsapp;

        setting.socialLinks.facebook =
            req.body.facebook ?? setting.socialLinks.facebook;

        setting.socialLinks.instagram =
            req.body.instagram ?? setting.socialLinks.instagram;

        setting.socialLinks.email =
            req.body.email ?? setting.socialLinks.email;

        await setting.save();

        res.status(200).json({
            status: "success",
            data: setting
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
module.exports = {
    getSettings,
    updateSettings
};