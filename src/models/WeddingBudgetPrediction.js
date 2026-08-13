const mongoose = require("mongoose");


const weddingBudgetPredictionSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    predictionName:{
        type:String,
        required:true,
        trim:true
    },

    inputParameters:{
        totalBudget:{
            type:Number,
            default:0
        },

        guestCount:{
            type:Number,
            default:0
        },

        weddingType:{
            type:String,
            default:""
        },

        location:{
            type:String,
            default:""
        },

        weddingDuration:{
            type:Number,
            default:1
        },

        preferences:{
            type:Object,
            default:{}
        }
    },

    predictedExpenses:[
        {
            category:{
                type:String,
                required:true
            },

            estimatedAmount:{
                type:Number,
                default:0
            },

            confidenceScore:{
                type:Number,
                default:0
            },

            reason:{
                type:String,
                default:""
            }
        }
    ],

    totalPredictedCost:{
        type:Number,
        default:0
    },

    budgetDifference:{
        type:Number,
        default:0
    },

    savingsOpportunity:{
        type:Number,
        default:0
    },

    riskAnalysis:{
        overspendingRisk:{
            type:String,
            enum:[
                "Low",
                "Medium",
                "High"
            ],
            default:"Low"
        },

        riskFactors:[
            {
                type:String
            }
        ]
    },

    aiRecommendations:[
        {
            recommendation:{
                type:String
            },

            impact:{
                type:String,
                enum:[
                    "Low",
                    "Medium",
                    "High"
                ],
                default:"Medium"
            }
        }
    ],

    predictionAccuracy:{
        type:Number,
        default:0
    },

    aiModelVersion:{
        type:String,
        default:""
    },

    predictionStatus:{
        type:String,
        enum:[
            "Generated",
            "Processing",
            "Updated",
            "Archived"
        ],
        default:"Generated"
    },

    generatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingBudgetPrediction",
    weddingBudgetPredictionSchema
);