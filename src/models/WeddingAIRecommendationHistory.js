const mongoose = require("mongoose");


const weddingAIRecommendationHistorySchema = new mongoose.Schema(
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


    recommendationType:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Theme",
            "Budget",
            "Guest Management",
            "Timeline",
            "Package",
            "Service",
            "Other"
        ],
        default:"Other"
    },


    requestDetails:{
        query:{
            type:String,
            default:""
        },

        userPreferences:{
            type:Object,
            default:{}
        },

        constraints:{
            type:Object,
            default:{}
        }
    },


    aiRecommendation:{
        title:{
            type:String,
            default:""
        },

        description:{
            type:String,
            default:""
        },

        recommendedItems:[
            {
                itemId:{
                    type:String,
                    default:""
                },

                itemName:{
                    type:String,
                    default:""
                },

                reason:{
                    type:String,
                    default:""
                },

                confidenceScore:{
                    type:Number,
                    default:0
                }
            }
        ]
    },


    userResponse:{
        action:{
            type:String,
            enum:[
                "Accepted",
                "Rejected",
                "Saved",
                "Ignored",
                "Modified"
            ],
            default:"Ignored"
        },

        feedback:{
            type:String,
            default:""
        },

        rating:{
            type:Number,
            min:1,
            max:5,
            default:null
        }
    },


    performanceMetrics:{
        accuracyScore:{
            type:Number,
            default:0
        },

        relevanceScore:{
            type:Number,
            default:0
        },

        satisfactionScore:{
            type:Number,
            default:0
        }
    },


    learningData:{
        useful:{
            type:Boolean,
            default:false
        },

        improvementTags:[
            {
                type:String
            }
        ]
    },


    aiModel:{
        name:{
            type:String,
            default:""
        },

        version:{
            type:String,
            default:""
        }
    },


    generatedAt:{
        type:Date,
        default:Date.now
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
    "WeddingAIRecommendationHistory",
    weddingAIRecommendationHistorySchema
);