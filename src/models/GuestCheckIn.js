const mongoose = require("mongoose");


const guestCheckInSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Guest",
        required:true
    },

    rsvp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RSVP"
    },

    qrCode:{
        type:String,
        required:true
    },

    checkInStatus:{
        type:String,
        enum:[
            "Not Arrived",
            "Checked In",
            "Checked Out"
        ],
        default:"Not Arrived"
    },

    checkInTime:{
        type:Date,
        default:null
    },

    checkOutTime:{
        type:Date,
        default:null
    },

    eventName:{
        type:String,
        default:""
    },

    entryGate:{
        type:String,
        default:""
    },

    verifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    deviceInfo:{
        type:String,
        default:""
    },

    notes:{
        type:String,
        default:""
    },

    isVerified:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "GuestCheckIn",
    guestCheckInSchema
);
