const mongoose = require("mongoose");


const apiKeySchema = new mongoose.Schema(
{
    serviceName:{
        type:String,
        required:true,
        trim:true
    },

    provider:{
        type:String,
        required:true,
        trim:true
    },

    apiKey:{
        type:String,
        required:true
    },

    apiSecret:{
        type:String,
        default:""
    },

    serviceType:{
        type:String,
        enum:[
            "Payment Gateway",
            "Maps",
            "Email Service",
            "SMS Service",
            "WhatsApp",
            "AI Service",
            "Storage",
            "Other"
        ],
        default:"Other"
    },

    environment:{
        type:String,
        enum:[
            "Development",
            "Testing",
            "Production"
        ],
        default:"Development"
    },

    permissions:[
        {
            type:String
        }
    ],

    usageLimit:{
        type:Number,
        default:0
    },

    usageCount:{
        type:Number,
        default:0
    },

    isActive:{
        type:Boolean,
        default:true
    },

    expiresAt:{
        type:Date,
        default:null
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
    "ApiKey",
    apiKeySchema
);