const mongoose = require("mongoose");


const paymentTransactionSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },

    transactionId:{
        type:String,
        required:true,
        unique:true
    },

    paymentGateway:{
        type:String,
        enum:[
            "Razorpay",
            "Stripe",
            "PayPal",
            "Bank Transfer",
            "Cash",
            "Other"
        ],
        default:"Other"
    },

    paymentType:{
        type:String,
        enum:[
            "Booking Payment",
            "Advance Payment",
            "Full Payment",
            "Subscription Payment",
            "Refund",
            "Other"
        ],
        default:"Booking Payment"
    },

    amount:{
        type:Number,
        required:true
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
            "Refunded",
            "Cancelled"
        ],
        default:"Pending"
    },

    paymentMethod:{
        type:String,
        default:""
    },

    gatewayResponse:{
        type:Object,
        default:{}
    },

    invoiceNumber:{
        type:String,
        default:""
    },

    refundAmount:{
        type:Number,
        default:0
    },

    refundReason:{
        type:String,
        default:""
    },

    paidAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "PaymentTransaction",
    paymentTransactionSchema
);