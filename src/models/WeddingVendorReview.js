const mongoose = require("mongoose");


const weddingVendorReviewSchema = new mongoose.Schema(
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


    reviewer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    bookingReference:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"WeddingVendorBooking"
    },


    rating:{
        overall:{
            type:Number,
            min:1,
            max:5,
            required:true
        },

        serviceQuality:{
            type:Number,
            min:1,
            max:5,
            default:0
        },

        professionalism:{
            type:Number,
            min:1,
            max:5,
            default:0
        },

        valueForMoney:{
            type:Number,
            min:1,
            max:5,
            default:0
        },

        punctuality:{
            type:Number,
            min:1,
            max:5,
            default:0
        }
    },


    reviewTitle:{
        type:String,
        default:""
    },


    reviewMessage:{
        type:String,
        default:""
    },


    media:[
        {
            mediaType:{
                type:String,
                enum:[
                    "Image",
                    "Video"
                ],
                default:"Image"
            },

            mediaUrl:{
                type:String,
                default:""
            }
        }
    ],


    vendorResponse:{
        responseMessage:{
            type:String,
            default:""
        },

        respondedDate:{
            type:Date,
            default:null
        }
    },


    aiAnalysis:{
        sentiment:{
            type:String,
            enum:[
                "Positive",
                "Neutral",
                "Negative"
            ],
            default:"Neutral"
        },

        sentimentScore:{
            type:Number,
            default:0
        },

        keywords:[
            {
                type:String
            }
        ],


        improvementSuggestions:[
            {
                type:String
            }
        ]
    },


    verification:{
        isVerifiedBooking:{
            type:Boolean,
            default:false
        },

        verifiedDate:{
            type:Date,
            default:null
        }
    },


    helpfulVotes:{
        type:Number,
        default:0
    },


    reportStatus:{
        type:String,
        enum:[
            "Active",
            "Reported",
            "Removed"
        ],
        default:"Active"
    },


    vendorRankingData:{
        qualityScore:{
            type:Number,
            default:0
        },

        trustScore:{
            type:Number,
            default:0
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
    "WeddingVendorReview",
    weddingVendorReviewSchema
);
