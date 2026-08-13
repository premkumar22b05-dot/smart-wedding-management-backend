const mongoose = require("mongoose");


const weddingNotificationSchema = new mongoose.Schema(
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


    notificationType:{
        type:String,
        enum:[
            "Task Reminder",
            "Payment Reminder",
            "Vendor Update",
            "Guest RSVP",
            "Wedding Timeline",
            "Invitation",
            "AI Recommendation",
            "System Alert",
            "Subscription",
            "Other"
        ],
        default:"Other"
    },


    title:{
        type:String,
        required:true,
        trim:true
    },


    message:{
        type:String,
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


    deliveryChannels:{
        pushNotification:{
            type:Boolean,
            default:false
        },


        email:{
            type:Boolean,
            default:false
        },


        sms:{
            type:Boolean,
            default:false
        },


        whatsapp:{
            type:Boolean,
            default:false
        }
    },


    deliveryStatus:{
        pushStatus:{
            type:String,
            enum:[
                "Pending",
                "Sent",
                "Failed"
            ],
            default:"Pending"
        },


        emailStatus:{
            type:String,
            enum:[
                "Pending",
                "Sent",
                "Failed"
            ],
            default:"Pending"
        },


        smsStatus:{
            type:String,
            enum:[
                "Pending",
                "Sent",
                "Failed"
            ],
            default:"Pending"
        }
    },


    relatedEntity:{
        entityType:{
            type:String,
            default:""
        },


        entityId:{
            type:String,
            default:""
        }
    },


    actionLink:{
        type:String,
        default:""
    },


    scheduledTime:{
        type:Date,
        default:null
    },


    sentTime:{
        type:Date,
        default:null
    },


    readStatus:{
        isRead:{
            type:Boolean,
            default:false
        },


        readAt:{
            type:Date,
            default:null
        }
    },


    reminderSettings:{
        isReminder:{
            type:Boolean,
            default:false
        },


        reminderFrequency:{
            type:String,
            enum:[
                "Once",
                "Daily",
                "Weekly",
                "Monthly"
            ],
            default:"Once"
        }
    },


    aiGenerated:{
        type:Boolean,
        default:false
    },


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
    "WeddingNotification",
    weddingNotificationSchema
);
