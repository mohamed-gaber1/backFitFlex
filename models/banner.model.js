const mongoose=require('mongoose');
const bannerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    subtitle:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        default:null
    },
    color:{
        type:String,
        default:"#000000"
    },
},{
    timestamps:true
})
module.exports = mongoose.model("Banner",bannerSchema);