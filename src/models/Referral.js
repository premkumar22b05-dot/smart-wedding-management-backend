const mongoose = require("mongoose");


const referralSchema = new mongoose.Schema(
{
    referrer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    referredUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    referralCode:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Registered",
            "Completed",
            "Rewarded",
            "Expired"
        ],
        default:"Pending"
    },

    rewardType:{
        type:String,
        enum:[
            "Discount Coupon",
            "Wallet Credit",
            "Premium Access",
            "Other"
        ],
        default:"Discount Coupon"
    },

    rewardValue:{
        type:Number,
        default:0
    },

    rewardClaimed:{
        type:Boolean,
        default:false
    },

    referredAt:{
        type:Date,
        default:null
    },

    completedAt:{
        type:Date,
        default:null
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
    "Referral",
    referralSchema
);