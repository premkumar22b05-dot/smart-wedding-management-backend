const mongoose = require("mongoose");


const weddingUserSubscriptionSchema = new mongoose.Schema(
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


    subscriptionDetails:{
        startDate:{
            type:Date,
            default:Date.now
        },


        endDate:{
            type:Date,
            required:true
        },


        autoRenew:{
            type:Boolean,
            default:false
        },


        renewalDate:{
            type:Date,
            default:null
        }
    },


    subscriptionStatus:{
        type:String,
        enum:[
            "Active",
            "Expired",
            "Cancelled",
            "Pending",
            "Suspended"
        ],
        default:"Pending"
    },


    paymentDetails:{
        transactionId:{
            type:String,
            default:""
        },


        paymentAmount:{
            type:Number,
            default:0
        },


        paymentMethod:{
            type:String,
            enum:[
                "UPI",
                "Credit Card",
                "Debit Card",
                "Net Banking",
                "Wallet",
                "Other"
            ],
            default:"UPI"
        },


        paymentStatus:{
            type:String,
            enum:[
                "Pending",
                "Success",
                "Failed",
                "Refunded"
            ],
            default:"Pending"
        },


        paymentDate:{
            type:Date,
            default:null
        }
    },


    usageTracking:{
        weddingsCreated:{
            type:Number,
            default:0
        },


        vendorsAdded:{
            type:Number,
            default:0
        },


        guestsManaged:{
            type:Number,
            default:0
        },


        aiRequestsUsed:{
            type:Number,
            default:0
        }
    },


    featureAccess:{
        aiAssistant:{
            type:Boolean,
            default:false
        },


        advancedAnalytics:{
            type:Boolean,
            default:false
        },


        unlimitedStorage:{
            type:Boolean,
            default:false
        },


        prioritySupport:{
            type:Boolean,
            default:false
        }
    },


    upgradeHistory:[
        {
            previousPlan:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"WeddingSubscriptionPlan"
            },


            newPlan:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"WeddingSubscriptionPlan"
            },


            changedDate:{
                type:Date,
                default:Date.now
            },


            reason:{
                type:String,
                default:""
            }
        }
    ],


    cancellationDetails:{
        cancelled:{
            type:Boolean,
            default:false
        },


        reason:{
            type:String,
            default:""
        },


        cancelledDate:{
            type:Date,
            default:null
        }
    },


    reminderSettings:{
        sendExpiryReminder:{
            type:Boolean,
            default:true
        },


        reminderDaysBeforeExpiry:{
            type:Number,
            default:7
        }
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
    "WeddingUserSubscription",
    weddingUserSubscriptionSchema
);