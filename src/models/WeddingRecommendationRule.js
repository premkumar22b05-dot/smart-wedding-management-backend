const mongoose = require("mongoose");


const weddingRecommendationRuleSchema = new mongoose.Schema(
{
    ruleName:{
        type:String,
        required:true,
        trim:true
    },

    recommendationType:{
        type:String,
        enum:[
            "Vendor",
            "Venue",
            "Package",
            "Theme",
            "Budget",
            "Timeline",
            "Service",
            "Other"
        ],
        default:"Other"
    },

    description:{
        type:String,
        default:""
    },

    conditions:[
        {
            field:{
                type:String,
                required:true
            },

            operator:{
                type:String,
                enum:[
                    "Equals",
                    "Not Equals",
                    "Greater Than",
                    "Less Than",
                    "Contains",
                    "Between"
                ],
                default:"Equals"
            },

            value:{
                type:String,
                required:true
            }
        }
    ],

    scoringFactors:[
        {
            factorName:{
                type:String,
                required:true
            },

            weight:{
                type:Number,
                default:1
            }
        }
    ],

    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        default:"Medium"
    },

    confidenceScore:{
        type:Number,
        default:0
    },

    usageCount:{
        type:Number,
        default:0
    },

    successRate:{
        type:Number,
        default:0
    },

    aiModelVersion:{
        type:String,
        default:""
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
    "WeddingRecommendationRule",
    weddingRecommendationRuleSchema
);
