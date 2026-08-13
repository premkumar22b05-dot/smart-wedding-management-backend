const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema(
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

    eventType:{
        type:String,
        enum:[
            "Engagement",
            "Mehendi",
            "Sangeet",
            "Haldi",
            "Wedding Ceremony",
            "Reception",
            "Other"
        ],
        default:"Other"
    },

    eventDate:{
        type:Date,
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    venue:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    guestCapacity:{
        type:Number,
        default:0
    },

    coordinator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    status:{
        type:String,
        enum:[
            "Upcoming",
            "Ongoing",
            "Completed",
            "Cancelled"
        ],
        default:"Upcoming"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Event",
    eventSchema
);