const mongoose = require("mongoose");


const weddingGuestFeedbackSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Guest"
    },

    feedbackTitle:{
        type:String,
        required:true,
        trim:true
    },

    overallRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    categoryRatings:{
        food:{
            type:Number,
            min:1,
            max:5,
            default:5
        },

        venue:{
            type:Number,
            min:1,
            max:5,
            default:5
        },

        decoration:{
            type:Number,
            min:1,
            max:5,
            default:5
        },

        hospitality:{
            type:Number,
            min:1,
            max:5,
            default:5
        },

        entertainment:{
            type:Number,
            min:1,
            max:5,
            default:5
        }
    },

    comments:{
        type:String,
        default:""
    },

    photos:[
        {
            type:String
        }
    ],

    sentimentAnalysis:{
        sentiment:{
            type:String,
            enum:[
                "Positive",
                "Neutral",
                "Negative"
            ],
            default:"Neutral"
        },

        sentimentScore:{
            type:Number,
            default:0
        },

        keywords:[
            {
                type:String
            }
        ]
    },

    improvementSuggestions:[
        {
            type:String
        }
    ],

    eventFeedback:[
        {
            eventName:{
                type:String
            },

            rating:{
                type:Number,
                min:1,
                max:5
            },

            comments:{
                type:String,
                default:""
            }
        }
    ],

    isAnonymous:{
        type:Boolean,
        default:false
    },

    responseStatus:{
        type:String,
        enum:[
            "Submitted",
            "Reviewed",
            "Analyzed"
        ],
        default:"Submitted"
    },

    aiProcessed:{
        type:Boolean,
        default:false
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
    "WeddingGuestFeedback",
    weddingGuestFeedbackSchema
);