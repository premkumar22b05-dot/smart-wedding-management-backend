const mongoose = require("mongoose");


const aiModelConfigSchema = new mongoose.Schema(
{
    modelName:{
        type:String,
        required:true,
        trim:true
    },

    modelType:{
        type:String,
        enum:[
            "Recommendation Engine",
            "Chatbot",
            "Prediction Model",
            "Optimization Model",
            "Classification Model",
            "Other"
        ],
        required:true
    },

    version:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    algorithm:{
        type:String,
        default:""
    },

    parameters:{
        type:Object,
        default:{}
    },

    performanceMetrics:{
        accuracy:{
            type:Number,
            default:0
        },

        precision:{
            type:Number,
            default:0
        },

        recall:{
            type:Number,
            default:0
        },

        f1Score:{
            type:Number,
            default:0
        }
    },

    trainingDataset:{
        type:String,
        default:""
    },

    lastTrainedDate:{
        type:Date,
        default:null
    },

    status:{
        type:String,
        enum:[
            "Development",
            "Testing",
            "Production",
            "Deprecated"
        ],
        default:"Development"
    },

    isActive:{
        type:Boolean,
        default:false
    },

    deployedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AIModelConfig",
    aiModelConfigSchema
);