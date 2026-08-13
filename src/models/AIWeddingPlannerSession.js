const mongoose = require("mongoose");


const aiWeddingPlannerSessionSchema = new mongoose.Schema(
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

    sessionTitle:{
        type:String,
        required:true,
        trim:true
    },

    sessionType:{
        type:String,
        enum:[
            "Budget Planning",
            "Venue Recommendation",
            "Vendor Recommendation",
            "Guest Planning",
            "Timeline Planning",
            "Theme Selection",
            "General Assistance",
            "Other"
        ],
        default:"General Assistance"
    },

    conversations:[
        {
            sender:{
                type:String,
                enum:[
                    "User",
                    "AI"
                ],
                required:true
            },

            message:{
                type:String,
                required:true
            },

            timestamp:{
                type:Date,
                default:Date.now
            }
        }
    ],

    userPreferences:{
        budget:{
            type:Number,
            default:0
        },

        guestCount:{
            type:Number,
            default:0
        },

        weddingStyle:{
            type:String,
            default:""
        },

        location:{
            type:String,
            default:""
        },

        preferences:{
            type:Object,
            default:{}
        }
    },

    aiRecommendations:[
        {
            recommendationType:{
                type:String,
                default:""
            },

            suggestion:{
                type:String,
                default:""
            },

            confidenceScore:{
                type:Number,
                default:0
            }
        }
    ],

    aiModelVersion:{
        type:String,
        default:""
    },

    sessionStatus:{
        type:String,
        enum:[
            "Active",
            "Completed",
            "Archived"
        ],
        default:"Active"
    },

    feedbackProvided:{
        type:Boolean,
        default:false
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AIWeddingPlannerSession",
    aiWeddingPlannerSessionSchema
);