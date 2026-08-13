const mongoose = require("mongoose");


const weddingNotificationScheduleSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    notificationTitle:{
        type:String,
        required:true,
        trim:true
    },

    notificationType:{
        type:String,
        enum:[
            "Wedding Reminder",
            "Guest Reminder",
            "Vendor Reminder",
            "Payment Reminder",
            "Task Reminder",
            "Event Alert",
            "Invitation Reminder",
            "Custom"
        ],
        default:"Custom"
    },

    message:{
        type:String,
        required:true
    },

    recipients:{
        type:String,
        enum:[
            "Bride",
            "Groom",
            "Family",
            "Guests",
            "Vendors",
            "All Users"
        ],
        default:"All Users"
    },

    deliveryChannels:[
        {
            type:String,
            enum:[
                "Email",
                "SMS",
                "WhatsApp",
                "Push Notification"
            ]
        }
    ],

    scheduledDate:{
        type:Date,
        required:true
    },

    sentDate:{
        type:Date,
        default:null
    },

    status:{
        type:String,
        enum:[
            "Scheduled",
            "Sent",
            "Failed",
            "Cancelled"
        ],
        default:"Scheduled"
    },

    repeat:{
        enabled:{
            type:Boolean,
            default:false
        },

        frequency:{
            type:String,
            enum:[
                "Daily",
                "Weekly",
                "Monthly"
            ]
        }
    },

    relatedEntity:{
        entityType:{
            type:String,
            default:""
        },

        entityId:{
            type:mongoose.Schema.Types.ObjectId
        }
    },

    isAutomatic:{
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
    "WeddingNotificationSchedule",
    weddingNotificationScheduleSchema
);