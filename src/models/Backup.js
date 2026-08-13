const mongoose = require("mongoose");


const backupSchema = new mongoose.Schema(
{
    backupName:{
        type:String,
        required:true,
        trim:true
    },

    backupType:{
        type:String,
        enum:[
            "Full Backup",
            "Database Backup",
            "File Backup",
            "Incremental Backup",
            "Manual Backup"
        ],
        default:"Database Backup"
    },

    storageProvider:{
        type:String,
        enum:[
            "Local Storage",
            "AWS S3",
            "Google Cloud",
            "Azure",
            "Other"
        ],
        default:"Local Storage"
    },

    backupLocation:{
        type:String,
        required:true
    },

    fileSize:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Processing",
            "Completed",
            "Failed",
            "Restored"
        ],
        default:"Processing"
    },

    backupDate:{
        type:Date,
        default:Date.now
    },

    restoreDate:{
        type:Date,
        default:null
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    errorMessage:{
        type:String,
        default:""
    },

    isAutomatic:{
        type:Boolean,
        default:false
    },

    retentionPeriod:{
        type:Number,
        default:30
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Backup",
    backupSchema
);