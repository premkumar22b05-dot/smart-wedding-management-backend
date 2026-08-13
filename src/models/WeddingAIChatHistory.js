const mongoose = require("mongoose");


const weddingAIChatHistorySchema = new mongoose.Schema(
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

    sessionId:{
        type:String,
        required:true
    },

    conversationTitle:{
        type:String,
        default:"Wedding Planning Assistant"
    },

    messages:[
        {
            sender:{
                type:String,
                enum:[
                    "User",
                    "AI",
                    "System"
                ],
                required:true
            },

            message:{
                type:String,
                required:true
            },

            messageType:{
                type:String,
                enum:[
                    "Text",
                    "Recommendation",
                    "Reminder",
                    "Analysis",
                    "Suggestion"
                ],
                default:"Text"
            },

            timestamp:{
                type:Date,
                default:Date.now
            }
        }
    ],

    contextData:{
        type:Object,
        default:{}
    },

    userIntent:{
        type:String,
        enum:[
            "Budget Planning",
            "Vendor Search",
            "Venue Selection",
            "Guest Management",
            "Theme Selection",
            "Timeline Planning",
            "General Query",
            "Other"
        ],
        default:"General Query"
    },

    aiResponseMetrics:{
        responseTime:{
            type:Number,
            default:0
        },

        confidenceScore:{
            type:Number,
            default:0
        },

        helpfulnessRating:{
            type:Number,
            min:1,
            max:5,
            default:null
        }
    },

    recommendationsGenerated:[
        {
            recommendationType:{
                type:String
            },

            recommendationText:{
                type:String
            },

            accepted:{
                type:Boolean,
                default:false
            }
        }
    ],

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

    status:{
        type:String,
        enum:[
            "Active",
            "Completed",
            "Archived"
        ],
        default:"Active"
    },

    lastInteraction:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingAIChatHistory",
    weddingAIChatHistorySchema
);
