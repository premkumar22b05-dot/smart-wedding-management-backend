const mongoose = require("mongoose");


const verificationSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    verificationType:{
        type:String,
        enum:[
            "Email Verification",
            "Phone Verification",
            "OTP Login",
            "Password Reset"
        ],
        required:true
    },

    verificationCode:{
        type:String,
        required:true
    },

    email:{
        type:String,
        default:""
    },

    phone:{
        type:String,
        default:""
    },

    expiresAt:{
        type:Date,
        required:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    verifiedAt:{
        type:Date,
        default:null
    },

    attemptCount:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Verification",
    verificationSchema
);
