const mongoose = require("mongoose");


const weddingInvoiceSchema = new mongoose.Schema(
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


    invoiceNumber:{
        type:String,
        required:true,
        unique:true
    },


    invoiceType:{
        type:String,
        enum:[
            "Venue Invoice",
            "Vendor Invoice",
            "Service Invoice",
            "Subscription Invoice",
            "Other"
        ],
        default:"Other"
    },


    customerDetails:{
        name:{
            type:String,
            required:true
        },

        email:{
            type:String,
            default:""
        },

        phone:{
            type:String,
            default:""
        },

        address:{
            type:String,
            default:""
        }
    },


    vendorDetails:{
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        },


        vendorName:{
            type:String,
            default:""
        },


        serviceCategory:{
            type:String,
            default:""
        }
    },


    items:[
        {
            itemName:{
                type:String,
                required:true
            },


            description:{
                type:String,
                default:""
            },


            quantity:{
                type:Number,
                default:1
            },


            price:{
                type:Number,
                default:0
            },


            total:{
                type:Number,
                default:0
            }
        }
    ],


    amountSummary:{
        subtotal:{
            type:Number,
            default:0
        },


        discount:{
            type:Number,
            default:0
        },


        tax:{
            type:Number,
            default:0
        },


        finalAmount:{
            type:Number,
            default:0
        }
    },


    taxDetails:{
        gstNumber:{
            type:String,
            default:""
        },


        gstPercentage:{
            type:Number,
            default:0
        }
    },


    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Partial",
            "Paid",
            "Refunded"
        ],
        default:"Pending"
    },


    paymentReference:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WeddingPayment"
    },


    invoiceFile:{
        pdfUrl:{
            type:String,
            default:""
        },


        generatedAt:{
            type:Date,
            default:Date.now
        }
    },


    dueDate:{
        type:Date,
        default:null
    },


    status:{
        type:String,
        enum:[
            "Draft",
            "Generated",
            "Sent",
            "Cancelled"
        ],
        default:"Draft"
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
    "WeddingInvoice",
    weddingInvoiceSchema
);