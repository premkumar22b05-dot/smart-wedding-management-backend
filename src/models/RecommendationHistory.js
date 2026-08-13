const mongoose = require("mongoose");


const recommendationHistorySchema = new mongoose.Schema(
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
            "Vendor",
            "Venue",
            "Service",
            "Package",
            "Budget",
            "Timeline"
        ],
        required:true
    },

    recommendedItems:[
        {
            itemId:{
                type:mongoose.Schema.Types.ObjectId
            },

            itemType:{
                type:String
            },

            rankingScore:{
                type:Number,
                default:0
            }
        }
    ],

    selectedItem:{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            default:null
        },

        itemType:{
            type:String,
            default:""
        }
    },

    userAction:{
        type:String,
        enum:[
            "Viewed",
            "Accepted",
            "Rejected",
            "Ignored"
        ],
        default:"Viewed"
    },

    feedbackRating:{
        type:Number,
        min:1,
        max:5,
        default:null
    },

    feedbackComment:{
        type:String,
        default:""
    },

    aiModelVersion:{
        type:String,
        default:"v1.0"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "RecommendationHistory",
    recommendationHistorySchema
);