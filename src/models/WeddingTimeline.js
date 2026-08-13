const mongoose = require("mongoose");


const weddingTimelineSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    timelineType:{
        type:String,
        enum:[
            "Pre Wedding",
            "Wedding Day",
            "Post Wedding",
            "Custom"
        ],
        default:"Pre Wedding"
    },

    milestones:[
        {
            milestoneName:{
                type:String,
                required:true
            },

            description:{
                type:String,
                default:""
            },

            startDate:{
                type:Date,
                required:true
            },

            endDate:{
                type:Date,
                required:true
            },

            priority:{
                type:String,
                enum:[
                    "Low",
                    "Medium",
                    "High",
                    "Critical"
                ],
                default:"Medium"
            },

            status:{
                type:String,
                enum:[
                    "Pending",
                    "In Progress",
                    "Completed",
                    "Delayed"
                ],
                default:"Pending"
            },

            assignedTo:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],

    completionPercentage:{
        type:Number,
        default:0
    },

    aiGenerated:{
        type:Boolean,
        default:false
    },

    remindersEnabled:{
        type:Boolean,
        default:true
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
    "WeddingTimeline",
    weddingTimelineSchema
);