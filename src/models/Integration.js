const mongoose = require("mongoose");


const integrationSchema = new mongoose.Schema(
{
    integrationName:{
        type:String,
        required:true,
        trim:true
    },

    provider:{
        type:String,
        required:true,
        trim:true
    },

    integrationType:{
        type:String,
        enum:[
            "Payment Gateway",
            "Calendar",
            "Social Media",
            "AI Service",
            "Cloud Storage",
            "Email Service",
            "SMS Service",
            "Analytics",
            "Other"
        ],
        required:true
    },

    description:{
        type:String,
        default:""
    },

    credentials:{
        type:Object,
        default:{}
    },

    configuration:{
        type:Object,
        default:{}
    },

    apiEndpoint:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "Connected",
            "Disconnected",
            "Pending",
            "Failed"
        ],
        default:"Pending"
    },

    lastSyncDate:{
        type:Date,
        default:null
    },

    syncEnabled:{
        type:Boolean,
        default:true
    },

    errorMessage:{
        type:String,
        default:""
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
    "Integration",
    integrationSchema
);