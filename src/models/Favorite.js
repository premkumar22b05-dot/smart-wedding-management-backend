const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    itemType:{
        type:String,
        enum:[
            "Vendor",
            "Venue",
            "Service",
            "Package"
        ],
        required:true
    },

    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    imageUrl:{
        type:String,
        default:""
    },

    notes:{
        type:String,
        default:""
    },

    isBooked:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Favorite",
    favoriteSchema
);