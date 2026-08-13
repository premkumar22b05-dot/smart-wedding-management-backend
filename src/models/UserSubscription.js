const mongoose = require("mongoose");


const userSubscriptionSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WeddingSubscriptionPlan",
        required:true
    },

    subscriptionStatus:{
        type:String,
        enum:[
            "Active",
            "Expired",
            "Cancelled",
            "Pending",
            "Trial"
        ],
        default:"Pending"
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        required:true
    },

    renewalDate:{
        type:Date,
        default:null
    },

    autoRenew:{
        type:Boolean,
        default:true
    },

    paymentDetails:{
        transactionId:{
            type:String,
            default:""
        },

        paymentMethod:{
            type:String,
            enum:[
                "Credit Card",
                "Debit Card",
                "UPI",
                "Net Banking",
                "Wallet",
                "Other"
            ],
            default:"Other"
        },

        amountPaid:{
            type:Number,
            default:0
        },

        currency:{
            type:String,
            default:"USD"
        },

        paymentStatus:{
            type:String,
            enum:[
                "Pending",
                "Completed",
                "Failed",
                "Refunded"
            ],
            default:"Pending"
        }
    },

    featureAccess:{
        type:Object,
        default:{}
    },

    usageStatistics:{
        aiPlannerUsage:{
            type:Number,
            default:0
        },

        vendorSearchUsage:{
            type:Number,
            default:0
        },

        reportGenerationCount:{
            type:Number,
            default:0
        }
    },

    cancellation:{
        isCancelled:{
            type:Boolean,
            default:false
        },

        cancelledDate:{
            type:Date,
            default:null
        },

        reason:{
            type:String,
            default:""
        }
    },

    subscriptionHistory:[
        {
            action:{
                type:String
            },

            date:{
                type:Date,
                default:Date.now
            },

            description:{
                type:String,
                default:""
            }
        }
    ],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "UserSubscription",
    userSubscriptionSchema
);
