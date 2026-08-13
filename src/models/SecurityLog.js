const mongoose = require("mongoose");


const securityLogSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    eventType:{
        type:String,
        enum:[
            "Login Success",
            "Login Failed",
            "Logout",
            "Password Changed",
            "Password Reset",
            "Account Locked",
            "OTP Verification",
            "Suspicious Activity",
            "Unauthorized Access",
            "Other"
        ],
        required:true
    },

    severity:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High",
            "Critical"
        ],
        default:"Low"
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

    location:{
        type:String,
        default:""
    },

    userAgent:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "Detected",
            "Reviewed",
            "Resolved"
        ],
        default:"Detected"
    },

    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    reviewedAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "SecurityLog",
    securityLogSchema
);