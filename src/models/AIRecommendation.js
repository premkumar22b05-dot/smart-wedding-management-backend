const mongoose = require("mongoose");


const aiRecommendationSchema = new mongoose.Schema(
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

    inputData:{
        budget:{
            type:Number,
            default:0
        },

        location:{
            type:String,
            default:""
        },

        guestCount:{
            type:Number,
            default:0
        },

        preferences:[
            {
                type:String
            }
        ]
    },

    recommendedItems:[
        {
            itemId:{
                type:mongoose.Schema.Types.ObjectId
            },

            itemType:{
                type:String
            },

            score:{
                type:Number,
                default:0
            },

            reason:{
                type:String,
                default:""
            }
        }
    ],

    aiModel:{
        type:String,
        default:"Smart Wedding AI Engine"
    },

    feedback:{
        type:String,
        default:""
    },

    isAccepted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AIRecommendation",
    aiRecommendationSchema
);