const mongoose = require("mongoose");


const weddingCouponOfferSchema = new mongoose.Schema(
{
    couponCode:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },

    offerTitle:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    offerType:{
        type:String,
        enum:[
            "Percentage Discount",
            "Fixed Discount",
            "Free Service",
            "Subscription Offer",
            "Vendor Offer",
            "Referral Reward",
            "Other"
        ],
        default:"Percentage Discount"
    },

    discount:{
        value:{
            type:Number,
            default:0
        },

        maximumDiscount:{
            type:Number,
            default:0
        }
    },

    applicableFor:{
        type:String,
        enum:[
            "All Services",
            "Venue",
            "Vendor",
            "Decoration",
            "Catering",
            "Photography",
            "Subscription",
            "Other"
        ],
        default:"All Services"
    },

    minimumPurchaseAmount:{
        type:Number,
        default:0
    },

    validFrom:{
        type:Date,
        required:true
    },

    validUntil:{
        type:Date,
        required:true
    },

    usageLimit:{
        type:Number,
        default:1
    },

    usedCount:{
        type:Number,
        default:0
    },

    userRestrictions:{
        firstTimeUserOnly:{
            type:Boolean,
            default:false
        },

        premiumUsersOnly:{
            type:Boolean,
            default:false
        },

        specificUsers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    },

    applicablePlans:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WeddingSubscriptionPlan"
        }
    ],

    campaignDetails:{
        campaignName:{
            type:String,
            default:""
        },

        source:{
            type:String,
            default:""
        }
    },

    status:{
        type:String,
        enum:[
            "Active",
            "Expired",
            "Disabled"
        ],
        default:"Active"
    },

    aiRecommended:{
        type:Boolean,
        default:false
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
    "WeddingCouponOffer",
    weddingCouponOfferSchema
);