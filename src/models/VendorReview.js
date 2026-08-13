const mongoose = require("mongoose");


const vendorReviewSchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    review:{
        type:String,
        required:true
    },

    images:[
        {
            type:String
        }
    ],

    qualityRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    serviceRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    communicationRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    valueRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    vendorResponse:{
        type:String,
        default:""
    },

    responseDate:{
        type:Date,
        default:null
    },

    isVerifiedBooking:{
        type:Boolean,
        default:false
    },

    helpfulCount:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Rejected"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "VendorReview",
    vendorReviewSchema
);