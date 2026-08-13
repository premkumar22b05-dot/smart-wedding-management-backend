const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    planName:{
        type:String,
        enum:[
            "Free",
            "Premium",
            "Professional",
            "Enterprise"
        ],
        default:"Free"
    },

    description:{
        type:String,
        default:""
    },

    price:{
        type:Number,
        default:0
    },

    billingCycle:{
        type:String,
        enum:[
            "Monthly",
            "Yearly",
            "Lifetime"
        ],
        default:"Monthly"
    },

    features:[
        {
            type:String
        }
    ],

    startDate:{
        type:Date,
        default:Date.now
    },

    expiryDate:{
        type:Date,
        default:null
    },

    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Paid",
            "Failed",
            "Cancelled"
        ],
        default:"Pending"
    },

    transactionId:{
        type:String,
        default:""
    },

    autoRenew:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:[
            "Active",
            "Expired",
            "Cancelled"
        ],
        default:"Active"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Subscription",
    subscriptionSchema
);