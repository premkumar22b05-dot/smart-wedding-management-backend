const mongoose = require("mongoose");


const activityLogSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    action:{
        type:String,
        required:true,
        trim:true
    },

    actionType:{
        type:String,
        enum:[
            "Login",
            "Logout",
            "Create",
            "Update",
            "Delete",
            "View",
            "Payment",
            "Booking",
            "Security",
            "Other"
        ],
        default:"Other"
    },

    module:{
        type:String,
        enum:[
            "User",
            "Wedding",
            "Vendor",
            "Venue",
            "Booking",
            "Payment",
            "AI",
            "System",
            "Other"
        ],
        default:"System"
    },

    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },

    targetType:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    ipAddress:{
        type:String,
        default:""
    },

    deviceInfo:{
        type:String,
        default:""
    },

    metadata:{
        type:Object,
        default:{}
    },

    status:{
        type:String,
        enum:[
            "Success",
            "Failed"
        ],
        default:"Success"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema
);