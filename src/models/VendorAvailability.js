const mongoose = require("mongoose");


const vendorAvailabilitySchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    availableDate:{
        type:Date,
        required:true
    },

    startTime:{
        type:String,
        default:""
    },

    endTime:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "Available",
            "Booked",
            "Blocked",
            "Unavailable"
        ],
        default:"Available"
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    notes:{
        type:String,
        default:""
    },

    isRecurring:{
        type:Boolean,
        default:false
    },

    recurringPattern:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "VendorAvailability",
    vendorAvailabilitySchema
);