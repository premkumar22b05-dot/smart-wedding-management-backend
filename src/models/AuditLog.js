const mongoose = require("mongoose");


const auditLogSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    action:{
        type:String,
        enum:[
            "CREATE",
            "READ",
            "UPDATE",
            "DELETE",
            "LOGIN",
            "LOGOUT",
            "PASSWORD_CHANGE"
        ],
        required:true
    },

    module:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    ipAddress:{
        type:String,
        default:""
    },

    userAgent:{
        type:String,
        default:""
    },

    affectedId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },

    status:{
        type:String,
        enum:[
            "SUCCESS",
            "FAILED"
        ],
        default:"SUCCESS"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AuditLog",
    auditLogSchema
);