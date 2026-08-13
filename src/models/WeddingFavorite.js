const mongoose = require("mongoose");


const weddingFavoriteSchema = new mongoose.Schema(
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


    favoriteType:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Theme",
            "Package",
            "Service",
            "AI Recommendation",
            "Other"
        ],
        default:"Other"
    },


    itemDetails:{
        itemId:{
            type:String,
            required:true
        },

        itemName:{
            type:String,
            default:""
        },

        category:{
            type:String,
            default:""
        },

        imageUrl:{
            type:String,
            default:""
        }
    },


    notes:{
        type:String,
        default:""
    },


    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High"
        ],
        default:"Medium"
    },


    tags:[
        {
            type:String
        }
    ],


    comparisonList:{
        type:String,
        default:""
    },


    aiInsights:{
        matchScore:{
            type:Number,
            default:0
        },

        reasonForRecommendation:{
            type:String,
            default:""
        }
    },


    status:{
        type:String,
        enum:[
            "Saved",
            "Contacted",
            "Booked",
            "Removed"
        ],
        default:"Saved"
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
    "WeddingFavorite",
    weddingFavoriteSchema
);
