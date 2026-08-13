const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
        required:true
    },

    messageType:{
        type:String,
        enum:[
            "Text",
            "Image",
            "File"
        ],
        default:"Text"
    },

    attachmentUrl:{
        type:String,
        default:""
    },

    isRead:{
        type:Boolean,
        default:false
    },

    readAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Chat",
    chatSchema
);