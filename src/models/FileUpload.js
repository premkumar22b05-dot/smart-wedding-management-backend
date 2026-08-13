const mongoose = require("mongoose");


const fileUploadSchema = new mongoose.Schema(
{
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    fileName:{
        type:String,
        required:true,
        trim:true
    },

    originalName:{
        type:String,
        required:true
    },

    fileType:{
        type:String,
        enum:[
            "Image",
            "Video",
            "Document",
            "Audio",
            "Other"
        ],
        default:"Other"
    },

    mimeType:{
        type:String,
        default:""
    },

    fileUrl:{
        type:String,
        required:true
    },

    thumbnailUrl:{
        type:String,
        default:""
    },

    storageProvider:{
        type:String,
        enum:[
            "Local Storage",
            "AWS S3",
            "Google Cloud",
            "Cloudinary",
            "Other"
        ],
        default:"Local Storage"
    },

    fileSize:{
        type:Number,
        default:0
    },

    folder:{
        type:String,
        default:"General"
    },

    category:{
        type:String,
        enum:[
            "Wedding Album",
            "Invitation",
            "Contract",
            "Invoice",
            "Vendor Media",
            "Profile",
            "Other"
        ],
        default:"Other"
    },

    accessPermission:{
        type:String,
        enum:[
            "Private",
            "Wedding Team",
            "Public"
        ],
        default:"Private"
    },

    isDeleted:{
        type:Boolean,
        default:false
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
    "FileUpload",
    fileUploadSchema
);
