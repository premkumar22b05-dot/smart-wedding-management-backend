const mongoose = require("mongoose");


const aiModelTrainingDataSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    dataType:{
        type:String,
        enum:[
            "Recommendation Feedback",
            "User Preference",
            "Vendor Selection",
            "Budget Decision",
            "Theme Selection",
            "Chat Interaction",
            "Behavior Pattern",
            "Other"
        ],
        default:"Other"
    },

    inputData:{
        type:Object,
        default:{}
    },

    outputData:{
        type:Object,
        default:{}
    },

    userAction:{
        type:String,
        enum:[
            "Accepted",
            "Rejected",
            "Modified",
            "Ignored",
            "Completed"
        ],
        default:"Ignored"
    },

    feedbackScore:{
        type:Number,
        min:0,
        max:5,
        default:0
    },

    learningValue:{
        type:String,
        enum:[
            "High",
            "Medium",
            "Low"
        ],
        default:"Medium"
    },

    aiModelName:{
        type:String,
        default:""
    },

    aiModelVersion:{
        type:String,
        default:""
    },

    trainingStatus:{
        type:String,
        enum:[
            "Collected",
            "Processed",
            "Used For Training",
            "Archived"
        ],
        default:"Collected"
    },

    tags:[
        {
            type:String
        }
    ],

    metadata:{
        type:Object,
        default:{}
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
    "AIModelTrainingData",
    aiModelTrainingDataSchema
);