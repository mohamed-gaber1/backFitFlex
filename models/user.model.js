const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true,
        unique:true,
        enum:["admin","dev"]
    },
    password:{
        type:String,
        required:true
    }
},
    {
        timestamps: true,
    }
)
const User = mongoose.model("User", userSchema);

module.exports = User;