const mongoose = require("mongoose");


const weddingIntegrationConfigSchema = new mongoose.Schema(
{
    integrationName:{
        type:String,
        required:true,
        trim:true
    },


    integrationType:{
        type:String,
        enum:[
            "Payment Gateway",
            "Cloud Storage",
            "AI Service",
            "Email Service",
            "SMS Service",
            "WhatsApp Service",
            "Maps Service",
            "Analytics Service",
            "Authentication Service",
            "Other"
        ],
        default:"Other"
    },


    providerName:{
        type:String,
        required:true
    },


    description:{
        type:String,
        default:""
    },


    apiConfiguration:{
        apiKey:{
            type:String,
            default:""
        },

        apiSecret:{
            type:String,
            default:""
        },

        endpointUrl:{
            type:String,
            default:""
        },

        webhookUrl:{
            type:String,
            default:""
        }
    },


    authentication:{
        authType:{
            type:String,
            enum:[
                "API Key",
                "OAuth",
                "JWT",
                "Basic Auth",
                "None"
            ],
            default:"API Key"
        },

        accessToken:{
            type:String,
            default:""
        },

        refreshToken:{
            type:String,
            default:""
        }
    },


    serviceSettings:{
        type:Object,
        default:{}
    },


    usageStatistics:{
        totalRequests:{
            type:Number,
            default:0
        },

        successfulRequests:{
            type:Number,
            default:0
        },

        failedRequests:{
            type:Number,
            default:0
        }
    },


    securitySettings:{
        encrypted:{
            type:Boolean,
            default:true
        },

        verified:{
            type:Boolean,
            default:false
        },

        lastSecurityCheck:{
            type:Date,
            default:null
        }
    },


    status:{
        type:String,
        enum:[
            "Active",
            "Inactive",
            "Expired",
            "Error"
        ],
        default:"Active"
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


    lastSync:{
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
    "WeddingIntegrationConfig",
    weddingIntegrationConfigSchema
);