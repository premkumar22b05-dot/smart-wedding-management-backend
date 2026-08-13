const mongoose = require("mongoose");


const contractSchema = new mongoose.Schema(
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

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    contractTitle:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    termsAndConditions:{
        type:String,
        default:""
    },

    contractFile:{
        type:String,
        default:""
    },

    startDate:{
        type:Date,
        default:null
    },

    endDate:{
        type:Date,
        default:null
    },

    amount:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Sent",
            "Accepted",
            "Rejected",
            "Expired"
        ],
        default:"Draft"
    },

    signedByCustomer:{
        type:Boolean,
        default:false
    },

    signedByVendor:{
        type:Boolean,
        default:false
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
    "Contract",
    contractSchema
);