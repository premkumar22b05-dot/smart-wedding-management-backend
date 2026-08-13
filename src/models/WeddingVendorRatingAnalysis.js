const mongoose = require("mongoose");


const weddingVendorRatingAnalysisSchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    totalReviews:{
        type:Number,
        default:0
    },

    averageRating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },

    ratingDistribution:{
        fiveStar:{
            type:Number,
            default:0
        },

        fourStar:{
            type:Number,
            default:0
        },

        threeStar:{
            type:Number,
            default:0
        },

        twoStar:{
            type:Number,
            default:0
        },

        oneStar:{
            type:Number,
            default:0
        }
    },

    serviceQualityScore:{
        type:Number,
        default:0
    },

    reliabilityScore:{
        type:Number,
        default:0
    },

    communicationScore:{
        type:Number,
        default:0
    },

    punctualityScore:{
        type:Number,
        default:0
    },

    valueForMoneyScore:{
        type:Number,
        default:0
    },

    positiveFeedbackPercentage:{
        type:Number,
        default:0
    },

    negativeFeedbackPercentage:{
        type:Number,
        default:0
    },

    commonPositiveFeedback:[
        {
            type:String
        }
    ],

    commonIssues:[
        {
            type:String
        }
    ],

    aiInsights:{
        strengths:[
            {
                type:String
            }
        ],

        weaknesses:[
            {
                type:String
            }
        ],

        improvementSuggestions:[
            {
                type:String
            }
        ]
    },

    rankingScore:{
        type:Number,
        default:0
    },

    performanceLevel:{
        type:String,
        enum:[
            "Excellent",
            "Good",
            "Average",
            "Needs Improvement"
        ],
        default:"Average"
    },

    lastAnalyzedDate:{
        type:Date,
        default:Date.now
    },

    aiModelVersion:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingVendorRatingAnalysis",
    weddingVendorRatingAnalysisSchema
);