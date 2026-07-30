const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    storeName: {
        type: String,
        default: "FitFlex",
        trim: true
    },

    socialLinks: {
        whatsapp: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Setting", settingSchema);