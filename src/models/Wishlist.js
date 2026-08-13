const mongoose = require("mongoose");


const wishlistSchema = new mongoose.Schema(
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
            "Idea"
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

    description:{
        type:String,
        default:""
    },

    imageUrl:{
        type:String,
        default:""
    },

    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Wishlist",
    wishlistSchema
);