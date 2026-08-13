const mongoose = require("mongoose");


const weddingBackupRecordSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    backupName:{
        type:String,
        required:true,
        trim:true
    },

    backupType:{
        type:String,
        enum:[
            "Full Backup",
            "Incremental Backup",
            "Manual Backup",
            "Automatic Backup"
        ],
        default:"Automatic Backup"
    },

    backupLocation:{
        type:String,
        default:""
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

    filePath:{
        type:String,
        default:""
    },

    fileSize:{
        type:Number,
        default:0
    },

    backupDate:{
        type:Date,
        default:Date.now
    },

    expiryDate:{
        type:Date,
        default:null
    },

    backupStatus:{
        type:String,
        enum:[
            "Processing",
            "Completed",
            "Failed",
            "Expired"
        ],
        default:"Processing"
    },

    encryption:{
        enabled:{
            type:Boolean,
            default:true
        },

        encryptionMethod:{
            type:String,
            default:"AES-256"
        }
    },

    restoreInformation:{
        restoreAvailable:{
            type:Boolean,
            default:true
        },

        lastRestoreDate:{
            type:Date,
            default:null
        },

        restoredBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },

    scheduleInformation:{
        isScheduled:{
            type:Boolean,
            default:true
        },

        frequency:{
            type:String,
            enum:[
                "Daily",
                "Weekly",
                "Monthly",
                "Manual"
            ],
            default:"Daily"
        }
    },

    verification:{
        checksum:{
            type:String,
            default:""
        },

        verified:{
            type:Boolean,
            default:false
        }
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
    "WeddingBackupRecord",
    weddingBackupRecordSchema
);