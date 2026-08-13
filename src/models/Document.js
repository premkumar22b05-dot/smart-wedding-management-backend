const mongoose = require("mongoose");


const documentSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    documentName:{
        type:String,
        required:true,
        trim:true
    },

    documentType:{
        type:String,
        enum:[
            "Contract",
            "Invoice",
            "Receipt",
            "Certificate",
            "Identity Proof",
            "Agreement",
            "Other"
        ],
        default:"Other"
    },

    fileUrl:{
        type:String,
        required:true
    },

    fileType:{
        type:String,
        default:"PDF"
    },

    fileSize:{
        type:Number,
        default:0
    },

    description:{
        type:String,
        default:""
    },

    accessLevel:{
        type:String,
        enum:[
            "Private",
            "Wedding Team",
            "Public"
        ],
        default:"Private"
    },

    verified:{
        type:Boolean,
        default:false
    },

    verifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    verifiedAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Document",
    documentSchema
);