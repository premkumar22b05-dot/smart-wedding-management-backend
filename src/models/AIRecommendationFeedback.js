const mongoose = require("mongoose");


const aiRecommendationFeedbackSchema = new mongoose.Schema(
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

    recommendation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AIRecommendation",
        required:true
    },

    recommendationType:{
        type:String,
        enum:[
            "Vendor",
            "Venue",
            "Package",
            "Service",
            "Budget",
            "Theme",
            "Timeline",
            "Other"
        ],
        default:"Other"
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        default:null
    },

    feedback:{
        type:String,
        default:""
    },

    actionTaken:{
        type:String,
        enum:[
            "Viewed",
            "Saved",
            "Shortlisted",
            "Booked",
            "Rejected",
            "Ignored"
        ],
        default:"Viewed"
    },

    reason:{
        type:String,
        default:""
    },

    improvementSuggestion:{
        type:String,
        default:""
    },

    aiModelVersion:{
        type:String,
        default:""
    },

    isHelpful:{
        type:Boolean,
        default:false
    },

    metadata:{
        type:Object,
        default:{}
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AIRecommendationFeedback",
    aiRecommendationFeedbackSchema
);