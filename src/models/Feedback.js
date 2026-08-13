const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema(
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

    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },

    feedbackType:{
        type:String,
        enum:[
            "System",
            "Vendor",
            "Service",
            "AI Recommendation",
            "Support",
            "Other"
        ],
        default:"System"
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    comment:{
        type:String,
        default:""
    },

    suggestions:{
        type:String,
        default:""
    },

    sentiment:{
        type:String,
        enum:[
            "Positive",
            "Neutral",
            "Negative"
        ],
        default:"Neutral"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Reviewed",
            "Resolved"
        ],
        default:"Pending"
    },

    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Feedback",
    feedbackSchema
);