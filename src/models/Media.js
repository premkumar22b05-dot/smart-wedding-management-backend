const mongoose = require("mongoose");


const mediaSchema = new mongoose.Schema(
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

    title:{
        type:String,
        required:true,
        trim:true
    },

    mediaType:{
        type:String,
        enum:[
            "Image",
            "Video",
            "Album"
        ],
        required:true
    },

    category:{
        type:String,
        enum:[
            "Engagement",
            "Pre Wedding",
            "Haldi",
            "Mehendi",
            "Wedding Ceremony",
            "Reception",
            "Other"
        ],
        default:"Other"
    },

    fileUrl:{
        type:String,
        required:true
    },

    thumbnailUrl:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    isPublic:{
        type:Boolean,
        default:false
    },

    likes:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Media",
    mediaSchema
);