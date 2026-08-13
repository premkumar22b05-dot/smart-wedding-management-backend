const mongoose = require("mongoose");


const systemSettingSchema = new mongoose.Schema(
{
    settingName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "General",
            "Security",
            "Payment",
            "Notification",
            "AI",
            "Email",
            "Storage",
            "Maintenance",
            "Other"
        ],
        default:"General"
    },

    value:{
        type:Object,
        default:{}
    },

    description:{
        type:String,
        default:""
    },

    isActive:{
        type:Boolean,
        default:true
    },

    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    lastUpdated:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "SystemSetting",
    systemSettingSchema
);