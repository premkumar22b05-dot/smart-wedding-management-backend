const mongoose = require("mongoose");


const calendarSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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

    eventType:{
        type:String,
        enum:[
            "Wedding Event",
            "Vendor Meeting",
            "Payment Reminder",
            "Task Deadline",
            "Appointment",
            "Personal Reminder",
            "Other"
        ],
        default:"Other"
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        default:null
    },

    startTime:{
        type:String,
        default:""
    },

    endTime:{
        type:String,
        default:""
    },

    location:{
        type:String,
        default:""
    },

    reminder:{
        type:Boolean,
        default:true
    },

    reminderTime:{
        type:Number,
        default:30
    },

    status:{
        type:String,
        enum:[
            "Scheduled",
            "Completed",
            "Cancelled"
        ],
        default:"Scheduled"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Calendar",
    calendarSchema
);