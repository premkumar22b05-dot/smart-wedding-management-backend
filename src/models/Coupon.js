const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema(
{
    code:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
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

    discountType:{
        type:String,
        enum:[
            "Percentage",
            "Fixed Amount"
        ],
        required:true
    },

    discountValue:{
        type:Number,
        required:true
    },

    minimumPurchase:{
        type:Number,
        default:0
    },

    maxDiscount:{
        type:Number,
        default:0
    },

    usageLimit:{
        type:Number,
        default:1
    },

    usedCount:{
        type:Number,
        default:0
    },

    applicableFor:{
        type:String,
        enum:[
            "Wedding",
            "Vendor",
            "Service",
            "Package",
            "All"
        ],
        default:"All"
    },

    startDate:{
        type:Date,
        required:true
    },

    expiryDate:{
        type:Date,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Coupon",
    couponSchema
);