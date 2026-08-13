const mongoose = require("mongoose");


const weddingSecurityAuditLogSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    actionType:{
        type:String,
        enum:[
            "Login",
            "Logout",
            "Register",
            "Password Change",
            "Profile Update",
            "Data Access",
            "Data Update",
            "Data Delete",
            "Payment Access",
            "Admin Action",
            "Security Alert",
            "Other"
        ],
        default:"Other"
    },

    actionDescription:{
        type:String,
        required:true
    },

    resource:{
        resourceType:{
            type:String,
            default:""
        },

        resourceId:{
            type:String,
            default:""
        }
    },

    ipAddress:{
        type:String,
        default:""
    },

    deviceInformation:{
        browser:{
            type:String,
            default:""
        },

        operatingSystem:{
            type:String,
            default:""
        },

        deviceName:{
            type:String,
            default:""
        }
    },

    location:{
        country:{
            type:String,
            default:""
        },

        city:{
            type:String,
            default:""
        }
    },

    securityStatus:{
        type:String,
        enum:[
            "Normal",
            "Warning",
            "Suspicious",
            "Blocked"
        ],
        default:"Normal"
    },

    riskScore:{
        type:Number,
        min:0,
        max:100,
        default:0
    },

    authenticationMethod:{
        type:String,
        enum:[
            "Password",
            "OTP",
            "Google OAuth",
            "Two Factor Authentication",
            "Other"
        ],
        default:"Password"
    },

    metadata:{
        type:Object,
        default:{}
    },

    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    reviewStatus:{
        type:String,
        enum:[
            "Pending",
            "Reviewed",
            "Resolved"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingSecurityAuditLog",
    weddingSecurityAuditLogSchema
);
