const mongoose = require("mongoose");


const weddingPaymentReminderSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },

    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },

    reminderTitle:{
        type:String,
        required:true,
        trim:true
    },

    paymentType:{
        type:String,
        enum:[
            "Advance Payment",
            "Installment Payment",
            "Final Payment",
            "Refund",
            "Other"
        ],
        default:"Other"
    },

    amount:{
        type:Number,
        default:0
    },

    dueDate:{
        type:Date,
        required:true
    },

    reminderDate:{
        type:Date,
        required:true
    },

    reminderType:{
        type:String,
        enum:[
            "Email",
            "SMS",
            "WhatsApp",
            "Push Notification"
        ],
        default:"Push Notification"
    },

    recipientType:{
        type:String,
        enum:[
            "Couple",
            "Vendor",
            "Planner",
            "Admin"
        ],
        default:"Couple"
    },

    message:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "Scheduled",
            "Sent",
            "Completed",
            "Cancelled"
        ],
        default:"Scheduled"
    },

    sentAt:{
        type:Date,
        default:null
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
    "WeddingPaymentReminder",
    weddingPaymentReminderSchema
);