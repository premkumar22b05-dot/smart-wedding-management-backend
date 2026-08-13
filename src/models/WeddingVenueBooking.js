const mongoose = require("mongoose");


const weddingVenueBookingSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue",
        required:true
    },


    bookingName:{
        type:String,
        required:true,
        trim:true
    },


    eventDetails:{
        eventName:{
            type:String,
            default:"Wedding Ceremony"
        },

        eventDate:{
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
        }
    },


    bookingStatus:{
        type:String,
        enum:[
            "Requested",
            "Pending Approval",
            "Confirmed",
            "Cancelled",
            "Completed"
        ],
        default:"Requested"
    },


    venueDetails:{
        venueName:{
            type:String,
            default:""
        },

        location:{
            type:String,
            default:""
        },

        capacity:{
            type:Number,
            default:0
        },

        selectedArea:{
            type:String,
            default:""
        }
    },


    pricing:{
        baseAmount:{
            type:Number,
            default:0
        },

        additionalCharges:{
            type:Number,
            default:0
        },

        discountAmount:{
            type:Number,
            default:0
        },

        taxAmount:{
            type:Number,
            default:0
        },

        totalAmount:{
            type:Number,
            default:0
        },

        currency:{
            type:String,
            default:"INR"
        }
    },


    paymentDetails:{
        advanceAmount:{
            type:Number,
            default:0
        },

        paidAmount:{
            type:Number,
            default:0
        },

        pendingAmount:{
            type:Number,
            default:0
        },

        paymentStatus:{
            type:String,
            enum:[
                "Pending",
                "Partial",
                "Completed"
            ],
            default:"Pending"
        }
    },


    contractDetails:{
        contractAvailable:{
            type:Boolean,
            default:false
        },

        contractUrl:{
            type:String,
            default:""
        },

        signedDate:{
            type:Date,
            default:null
        }
    },


    facilities:[
        {
            type:String
        }
    ],


    specialRequirements:{
        type:String,
        default:""
    },


    availabilityCheck:{
        checked:{
            type:Boolean,
            default:false
        },

        available:{
            type:Boolean,
            default:false
        },

        checkedDate:{
            type:Date,
            default:null
        }
    },


    aiAnalysis:{
        suitabilityScore:{
            type:Number,
            default:0
        },

        recommendationReason:{
            type:String,
            default:""
        }
    },


    cancellationDetails:{
        cancelled:{
            type:Boolean,
            default:false
        },

        reason:{
            type:String,
            default:""
        },

        cancelledDate:{
            type:Date,
            default:null
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
    "WeddingVenueBooking",
    weddingVenueBookingSchema
);