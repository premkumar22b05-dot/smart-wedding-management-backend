const mongoose = require("mongoose");


const vendorPortfolioSchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    portfolioTitle:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    category:{
        type:String,
        enum:[
            "Photography",
            "Videography",
            "Decoration",
            "Catering",
            "Venue",
            "Makeup",
            "Entertainment",
            "Fashion",
            "Other"
        ],
        default:"Other"
    },

    coverImage:{
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

            url:{
                type:String,
                required:true
            },

            title:{
                type:String,
                default:""
            },

            description:{
                type:String,
                default:""
            }
        }
    ],

    completedProjects:[
        {
            projectName:{
                type:String,
                required:true
            },

            weddingDate:{
                type:Date
            },

            location:{
                type:String,
                default:""
            },

            clientReview:{
                type:String,
                default:""
            },

            rating:{
                type:Number,
                min:1,
                max:5,
                default:5
            }
        }
    ],

    expertise:[
        {
            type:String
        }
    ],

    serviceHighlights:[
        {
            type:String
        }
    ],

    awards:[
        {
            type:String
        }
    ],

    aiTags:[
        {
            type:String
        }
    ],

    views:{
        type:Number,
        default:0
    },

    likes:{
        type:Number,
        default:0
    },

    isFeatured:{
        type:Boolean,
        default:false
    },

    isActive:{
        type:Boolean,
        default:true
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
    "VendorPortfolio",
    vendorPortfolioSchema
);