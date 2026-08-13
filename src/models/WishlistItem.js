const mongoose = require("mongoose");


const wishlistItemSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    itemType:{
        type:String,
        enum:[
            "Vendor",
            "Venue",
            "Service",
            "Package",
            "Theme",
            "Other"
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

    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Must Have"
        ],
        default:"Medium"
    },

    estimatedCost:{
        type:Number,
        default:0
    },

    notes:{
        type:String,
        default:""
    },

    compared:{
        type:Boolean,
        default:false
    },

    selected:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:[
            "Saved",
            "Shortlisted",
            "Selected",
            "Removed"
        ],
        default:"Saved"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WishlistItem",
    wishlistItemSchema
);