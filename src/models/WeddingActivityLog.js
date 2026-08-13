const mongoose = require("mongoose");


const weddingActivityLogSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },


    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },


    activityType:{
        type:String,
        enum:[
            "User Login",
            "Profile Update",
            "Wedding Created",
            "Wedding Updated",
            "Task Created",
            "Task Completed",
            "Vendor Added",
            "Vendor Updated",
            "Payment Made",
            "Payment Updated",
            "Guest Added",
            "AI Interaction",
            "Report Generated",
            "System Action",
            "Admin Action",
            "Other"
        ],
        default:"Other"
    },


    moduleName:{
        type:String,
        enum:[
            "Authentication",
            "Wedding Management",
            "Vendor Management",
            "Guest Management",
            "Budget Management",
            "AI Assistant",
            "Payment",
            "Reports",
            "Admin",
            "Other"
        ],
        default:"Other"
    },


    action:{
        type:String,
        required:true
    },


    description:{
        type:String,
        default:""
    },


    entityDetails:{
        entityType:{
            type:String,
            default:""
        },

        entityId:{
            type:String,
            default:""
        }
    },


    oldData:{
        type:Object,
        default:{}
    },


    newData:{
        type:Object,
        default:{}
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

        ipAddress:{
            type:String,
            default:""
        }
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


    status:{
        type:String,
        enum:[
            "Success",
            "Failed",
            "Pending"
        ],
        default:"Success"
    },


    timestamp:{
        type:Date,
        default:Date.now
    },


    metadata:{
        type:Object,
        default:{}
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingActivityLog",
    weddingActivityLogSchema
);