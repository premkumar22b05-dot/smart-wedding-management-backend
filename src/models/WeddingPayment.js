const mongoose = require("mongoose");


const weddingPaymentSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },


    bookingReference:{
        type:String,
        default:""
    },


    paymentType:{
        type:String,
        enum:[
            "Venue Booking",
            "Vendor Payment",
            "Subscription Payment",
            "Invoice Payment",
            "Refund",
            "Other"
        ],
        default:"Other"
    },


    paymentDetails:{
        amount:{
            type:Number,
            required:true,
            default:0
        },


        currency:{
            type:String,
            default:"INR"
        },


        paymentMethod:{
            type:String,
            enum:[
                "UPI",
                "Credit Card",
                "Debit Card",
                "Net Banking",
                "Cash",
                "Wallet",
                "Other"
            ],
            default:"UPI"
        }
    },


    transactionDetails:{
        transactionId:{
            type:String,
            unique:true,
            sparse:true
        },


        gatewayName:{
            type:String,
            default:""
        },


        gatewayResponse:{
            type:Object,
            default:{}
        },


        paymentDate:{
            type:Date,
            default:Date.now
        }
    },


    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Processing",
            "Success",
            "Failed",
            "Cancelled",
            "Refunded"
        ],
        default:"Pending"
    },


    refundDetails:{
        isRefunded:{
            type:Boolean,
            default:false
        },


        refundAmount:{
            type:Number,
            default:0
        },


        refundReason:{
            type:String,
            default:""
        },


        refundDate:{
            type:Date,
            default:null
        }
    },


    invoiceReference:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WeddingInvoice"
    },


    paymentProof:{
        receiptUrl:{
            type:String,
            default:""
        },


        uploadedAt:{
            type:Date,
            default:null
        }
    },


    securityDetails:{
        ipAddress:{
            type:String,
            default:""
        },


        deviceInfo:{
            type:String,
            default:""
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
    "WeddingPayment",
    weddingPaymentSchema
);