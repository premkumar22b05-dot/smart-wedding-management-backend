const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema(
{

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    wedding:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    title:
    {
        type:String,
        required:true,
        trim:true
    },


    message:
    {
        type:String,
        required:true,
        trim:true
    },


    type:
    {
        type:String,
        enum:[
            "Booking",
            "Payment",
            "Checklist",
            "Guest",
            "Reminder",
            "System"
        ],
        default:"System"
    },


    isRead:
    {
        type:Boolean,
        default:false
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Notification",
    notificationSchema
);