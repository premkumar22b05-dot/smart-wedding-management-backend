const mongoose = require("mongoose");


const weddingAnalyticsReportSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    reportName:{
        type:String,
        required:true,
        trim:true
    },

    reportType:{
        type:String,
        enum:[
            "Budget Analysis",
            "Guest Analysis",
            "Vendor Performance",
            "Task Progress",
            "Wedding Overview",
            "AI Insights",
            "Custom"
        ],
        default:"Custom"
    },

    generatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    summary:{
        type:String,
        default:""
    },

    metrics:{
        type:Object,
        default:{}
    },

    budgetInsights:{
        totalBudget:{
            type:Number,
            default:0
        },

        spentAmount:{
            type:Number,
            default:0
        },

        remainingAmount:{
            type:Number,
            default:0
        },

        spendingPercentage:{
            type:Number,
            default:0
        }
    },

    guestInsights:{
        totalGuests:{
            type:Number,
            default:0
        },

        confirmedGuests:{
            type:Number,
            default:0
        },

        declinedGuests:{
            type:Number,
            default:0
        },

        pendingResponses:{
            type:Number,
            default:0
        }
    },

    vendorInsights:{
        totalVendors:{
            type:Number,
            default:0
        },

        completedServices:{
            type:Number,
            default:0
        },

        pendingServices:{
            type:Number,
            default:0
        }
    },

    aiRecommendations:[
        {
            title:{
                type:String
            },

            suggestion:{
                type:String
            },

            priority:{
                type:String,
                enum:[
                    "Low",
                    "Medium",
                    "High",
                    "Critical"
                ],
                default:"Medium"
            }
        }
    ],

    chartsData:{
        type:Object,
        default:{}
    },

    generatedDate:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        enum:[
            "Generated",
            "Processing",
            "Failed"
        ],
        default:"Generated"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingAnalyticsReport",
    weddingAnalyticsReportSchema
);
