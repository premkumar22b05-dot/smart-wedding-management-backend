const mongoose = require("mongoose");


const weddingTimelineEventSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    eventName:{
        type:String,
        required:true,
        trim:true
    },

    eventCategory:{
        type:String,
        enum:[
            "Ceremony",
            "Reception",
            "Photography",
            "Decoration",
            "Catering",
            "Entertainment",
            "Guest Activity",
            "Transportation",
            "Other"
        ],
        default:"Other"
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

    location:{
        type:String,
        default:""
    },

    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue"
    },

    assignedVendors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],

    assignedUsers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    reminders:[
        {
            reminderTime:{
                type:Date,
                required:true
            },

            reminderType:{
                type:String,
                enum:[
                    "Email",
                    "SMS",
                    "Push Notification",
                    "WhatsApp"
                ],
                default:"Push Notification"
            },

            sent:{
                type:Boolean,
                default:false
            }
        }
    ],

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
            "Scheduled",
            "Started",
            "Completed",
            "Cancelled",
            "Delayed"
        ],
        default:"Scheduled"
    },

    dependencies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"WeddingTimelineEvent"
        }
    ],

    notes:{
        type:String,
        default:""
    },

    aiOptimized:{
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
    "WeddingTimelineEvent",
    weddingTimelineEventSchema
);