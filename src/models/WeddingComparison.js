const mongoose = require("mongoose");


const weddingComparisonSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },


    comparisonName:{
        type:String,
        required:true,
        trim:true
    },


    comparisonType:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Package",
            "Theme",
            "Service",
            "Budget",
            "Other"
        ],
        default:"Other"
    },


    items:[
        {
            itemId:{
                type:String,
                required:true
            },

            itemName:{
                type:String,
                default:""
            },

            imageUrl:{
                type:String,
                default:""
            },

            pricing:{
                type:Number,
                default:0
            },

            rating:{
                type:Number,
                default:0
            },

            reviewsCount:{
                type:Number,
                default:0
            },

            features:[
                {
                    type:String
                }
            ],

            availability:{
                type:String,
                default:""
            }
        }
    ],


    comparisonCriteria:[
        {
            criteriaName:{
                type:String,
                required:true
            },

            weight:{
                type:Number,
                default:1
            }
        }
    ],


    aiAnalysis:{
        bestChoice:{
            itemId:{
                type:String,
                default:""
            },

            itemName:{
                type:String,
                default:""
            }
        },


        recommendationReason:{
            type:String,
            default:""
        },


        confidenceScore:{
            type:Number,
            default:0
        }
    },


    userDecision:{
        selectedItemId:{
            type:String,
            default:""
        },

        decisionStatus:{
            type:String,
            enum:[
                "Pending",
                "Selected",
                "Rejected"
            ],
            default:"Pending"
        }
    },


    comparisonStatus:{
        type:String,
        enum:[
            "Active",
            "Completed",
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
    "WeddingComparison",
    weddingComparisonSchema
);