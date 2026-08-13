const mongoose = require("mongoose");


const weddingVendorContractSchema = new mongoose.Schema(
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

    contractNumber:{
        type:String,
        unique:true,
        trim:true
    },

    serviceType:{
        type:String,
        enum:[
            "Photography",
            "Catering",
            "Decoration",
            "Venue",
            "Entertainment",
            "Transportation",
            "Makeup",
            "Other"
        ],
        default:"Other"
    },

    contractDetails:{
        type:String,
        default:""
    },

    agreementDocument:{
        type:String,
        default:""
    },

    termsAndConditions:{
        type:String,
        default:""
    },

    paymentTerms:{
        totalAmount:{
            type:Number,
            default:0
        },

        advanceAmount:{
            type:Number,
            default:0
        },

        remainingAmount:{
            type:Number,
            default:0
        },

        dueDate:{
            type:Date,
            default:null
        }
    },

    startDate:{
        type:Date,
        default:null
    },

    endDate:{
        type:Date,
        default:null
    },

    signatureDetails:{
        clientSigned:{
            type:Boolean,
            default:false
        },

        vendorSigned:{
            type:Boolean,
            default:false
        },

        signedDate:{
            type:Date,
            default:null
        }
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Pending Approval",
            "Active",
            "Completed",
            "Cancelled",
            "Expired"
        ],
        default:"Draft"
    },

    renewalRequired:{
        type:Boolean,
        default:false
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
    "WeddingVendorContract",
    weddingVendorContractSchema
);