const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Feature", featureSchema);