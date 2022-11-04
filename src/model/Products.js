const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        minlength:100,
        maxLength:200
    },
    price:{
        type:Number
    },
    image:{
        type: String
    },
    cloudinary_id: {
        type: String,
    }
})

module.exports = new mongoose.model("Product", productSchema);