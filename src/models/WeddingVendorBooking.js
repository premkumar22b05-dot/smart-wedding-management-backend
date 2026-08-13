const mongoose = require("mongoose");


const weddingVendorBookingSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },


    bookingTitle:{
        type:String,
        required:true,
        trim:true
    },


    serviceCategory:{
        type:String,
        enum:[
            "Photography",
            "Videography",
            "Catering",
            "Decoration",
            "Music",
            "Makeup",
            "Wedding Dress",
            "Transportation",
            "Invitation",
            "Entertainment",
            "Other"
        ],
        default:"Other"
    },


    serviceDetails:{
        description:{
            type:String,
            default:""
        },

        packageName:{
            type:String,
            default:""
        },

        selectedServices:[
            {
                type:String
            }
        ]
    },


    eventSchedule:{
        eventName:{
            type:String,
            default:""
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
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default:"Requested"
    },


    pricing:{
        serviceAmount:{
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
        advancePaid:{
            type:Number,
            default:0
        },

        amountPaid:{
            type:Number,
            default:0
        },

        remainingAmount:{
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

        agreementDate:{
            type:Date,
            default:null
        }
    },


    vendorCommunication:{
        lastContactDate:{
            type:Date,
            default:null
        },

        communicationStatus:{
            type:String,
            enum:[
                "Not Contacted",
                "Contacted",
                "Confirmed",
                "Completed"
            ],
            default:"Not Contacted"
        }
    },


    deliverables:[
        {
            item:{
                type:String
            },

            status:{
                type:String,
                enum:[
                    "Pending",
                    "Processing",
                    "Delivered"
                ],
                default:"Pending"
            },

            deliveryDate:{
                type:Date,
                default:null
            }
        }
    ],


    vendorRating:{
        rating:{
            type:Number,
            min:1,
            max:5,
            default:null
        },

        review:{
            type:String,
            default:""
        }
    },


    aiAnalysis:{
        vendorMatchScore:{
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
    "WeddingVendorBooking",
    weddingVendorBookingSchema
);
