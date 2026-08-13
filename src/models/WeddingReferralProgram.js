const mongoose = require("mongoose");


const weddingReferralProgramSchema = new mongoose.Schema(
{
    referralCode:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true
    },

    referrer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    referredUsers:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            joinedDate:{
                type:Date,
                default:Date.now
            },

            status:{
                type:String,
                enum:[
                    "Invited",
                    "Registered",
                    "Subscribed",
                    "Completed"
                ],
                default:"Invited"
            },

            rewardGenerated:{
                type:Boolean,
                default:false
            }
        }
    ],

    programName:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    rewardDetails:{
        referrerReward:{
            rewardType:{
                type:String,
                enum:[
                    "Discount Coupon",
                    "Cash Reward",
                    "Subscription Upgrade",
                    "Free Service",
                    "Points"
                ],
                default:"Discount Coupon"
            },

            rewardValue:{
                type:Number,
                default:0
            }
        },

        referredUserReward:{
            rewardType:{
                type:String,
                enum:[
                    "Discount Coupon",
                    "Cash Reward",
                    "Free Service",
                    "Points"
                ],
                default:"Discount Coupon"
            },

            rewardValue:{
                type:Number,
                default:0
            }
        }
    },

    totalInvites:{
        type:Number,
        default:0
    },

    successfulReferrals:{
        type:Number,
        default:0
    },

    totalRewardsIssued:{
        type:Number,
        default:0
    },

    campaignPeriod:{
        startDate:{
            type:Date,
            required:true
        },

        endDate:{
            type:Date,
            required:true
        }
    },

    referralLink:{
        type:String,
        default:""
    },

    trackingData:{
        clicks:{
            type:Number,
            default:0
        },

        registrations:{
            type:Number,
            default:0
        },

        conversions:{
            type:Number,
            default:0
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

    aiOptimized:{
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
    "WeddingReferralProgram",
    weddingReferralProgramSchema
);