const mongoose = require("mongoose");


const weddingSubscriptionPlanSchema = new mongoose.Schema(
{
    planName:{
        type:String,
        required:true,
        trim:true
    },

    planType:{
        type:String,
        enum:[
            "Free",
            "Basic",
            "Premium",
            "Enterprise"
        ],
        default:"Free"
    },

    description:{
        type:String,
        default:""
    },

    pricing:{
        amount:{
            type:Number,
            default:0
        },

        currency:{
            type:String,
            default:"USD"
        },

        billingCycle:{
            type:String,
            enum:[
                "Monthly",
                "Yearly",
                "Lifetime"
            ],
            default:"Monthly"
        }
    },

    duration:{
        value:{
            type:Number,
            default:1
        },

        unit:{
            type:String,
            enum:[
                "Month",
                "Year",
                "Lifetime"
            ],
            default:"Month"
        }
    },

    features:[
        {
            featureName:{
                type:String,
                required:true
            },

            enabled:{
                type:Boolean,
                default:true
            },

            limit:{
                type:Number,
                default:-1
            }
        }
    ],

    aiFeatures:{
        aiPlanner:{
            type:Boolean,
            default:false
        },

        budgetPrediction:{
            type:Boolean,
            default:false
        },

        vendorRecommendation:{
            type:Boolean,
            default:false
        },

        analyticsReports:{
            type:Boolean,
            default:false
        }
    },

    userLimit:{
        type:Number,
        default:1
    },

    weddingLimit:{
        type:Number,
        default:1
    },

    popularPlan:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:[
            "Active",
            "Inactive",
            "Archived"
        ],
        default:"Active"
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
    "WeddingSubscriptionPlan",
    weddingSubscriptionPlanSchema
);
