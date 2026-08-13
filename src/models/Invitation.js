const mongoose = require("mongoose");


const invitationSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    message:{
        type:String,
        default:""
    },

    template:{
        type:String,
        default:"Classic"
    },

    invitationType:{
        type:String,
        enum:[
            "Digital",
            "Printed",
            "Video"
        ],
        default:"Digital"
    },

    invitationLink:{
        type:String,
        default:""
    },

    sentDate:{
        type:Date,
        default:null
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Sent",
            "Viewed",
            "Accepted",
            "Expired"
        ],
        default:"Draft"
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
    "Invitation",
    invitationSchema
);