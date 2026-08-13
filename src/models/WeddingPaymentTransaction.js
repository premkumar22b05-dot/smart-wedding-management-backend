const mongoose = require("mongoose");


const weddingPaymentTransactionSchema = new mongoose.Schema(
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

    transactionId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    paymentType:{
        type:String,
        enum:[
            "Vendor Payment",
            "Subscription Payment",
            "Booking Payment",
            "Refund",
            "Advance Payment",
            "Final Payment",
            "Other"
        ],
        default:"Other"
    },

    paymentGateway:{
        type:String,
        enum:[
            "Razorpay",
            "Stripe",
            "PayPal",
            "UPI",
            "Bank Transfer",
            "Cash",
            "Other"
        ],
        default:"Other"
    },

    amount:{
        type:Number,
        required:true,
        default:0
    },

    currency:{
        type:String,
        default:"INR"
    },

    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Processing",
            "Completed",
            "Failed",
            "Cancelled",
            "Refunded"
        ],
        default:"Pending"
    },

    paymentMethod:{
        type:String,
        enum:[
            "Credit Card",
            "Debit Card",
            "UPI",
            "Net Banking",
            "Wallet",
            "Cash",
            "Other"
        ],
        default:"UPI"
    },

    invoiceDetails:{
        invoiceNumber:{
            type:String,
            default:""
        },

        invoiceUrl:{
            type:String,
            default:""
        },

        generatedDate:{
            type:Date,
            default:null
        }
    },

    refundDetails:{
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

    paymentMetadata:{
        type:Object,
        default:{}
    },

    verified:{
        type:Boolean,
        default:false
    },

    verifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    transactionDate:{
        type:Date,
        default:Date.now
    },

    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingPaymentTransaction",
    weddingPaymentTransactionSchema
);