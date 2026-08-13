const mongoose = require("mongoose");


const vendorAvailabilitySlotSchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    timeSlots:[
        {
            startTime:{
                type:String,
                required:true
            },

            endTime:{
                type:String,
                required:true
            },

            status:{
                type:String,
                enum:[
                    "Available",
                    "Booked",
                    "Blocked"
                ],
                default:"Available"
            },

            booking:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            }
        }
    ],

    availabilityStatus:{
        type:String,
        enum:[
            "Available",
            "Partially Available",
            "Fully Booked",
            "Unavailable"
        ],
        default:"Available"
    },

    blockReason:{
        type:String,
        default:""
    },

    recurring:{
        enabled:{
            type:Boolean,
            default:false
        },

        pattern:{
            type:String,
            enum:[
                "Daily",
                "Weekly",
                "Monthly"
            ]
        }
    },

    notes:{
        type:String,
        default:""
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
    "VendorAvailabilitySlot",
    vendorAvailabilitySlotSchema
);