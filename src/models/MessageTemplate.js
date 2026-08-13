const mongoose = require("mongoose");


const messageTemplateSchema = new mongoose.Schema(
{
    templateName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Invitation",
            "Booking",
            "Payment",
            "Reminder",
            "Notification",
            "Marketing",
            "Other"
        ],
        required:true
    },

    channel:{
        type:String,
        enum:[
            "Email",
            "SMS",
            "WhatsApp",
            "Push Notification",
            "In-App"
        ],
        default:"In-App"
    },

    subject:{
        type:String,
        default:""
    },

    messageBody:{
        type:String,
        required:true
    },

    variables:[
        {
            type:String
        }
    ],

    isActive:{
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
    "MessageTemplate",
    messageTemplateSchema
);