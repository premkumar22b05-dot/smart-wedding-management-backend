const mongoose = require("mongoose");


const analyticsEventSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    eventName:{
        type:String,
        required:true,
        trim:true
    },

    eventCategory:{
        type:String,
        enum:[
            "User Activity",
            "Search",
            "Booking",
            "Payment",
            "AI Interaction",
            "Vendor",
            "Venue",
            "Marketing",
            "System",
            "Other"
        ],
        default:"Other"
    },

    action:{
        type:String,
        required:true
    },

    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },

    targetType:{
        type:String,
        default:""
    },

    metadata:{
        type:Object,
        default:{}
    },

    deviceInfo:{
        type:Object,
        default:{}
    },

    sessionId:{
        type:String,
        default:""
    },

    ipAddress:{
        type:String,
        default:""
    },

    timestamp:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AnalyticsEvent",
    analyticsEventSchema
);