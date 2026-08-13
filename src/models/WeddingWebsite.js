const mongoose = require("mongoose");


const weddingWebsiteSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    websiteName:{
        type:String,
        required:true,
        trim:true
    },

    customSlug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    customDomain:{
        type:String,
        default:""
    },

    theme:{
        type:String,
        default:"Classic"
    },

    template:{
        type:String,
        default:"Default"
    },

    coupleStory:{
        type:String,
        default:""
    },

    brideDetails:{
        name:{
            type:String,
            default:""
        },

        photo:{
            type:String,
            default:""
        },

        description:{
            type:String,
            default:""
        }
    },

    groomDetails:{
        name:{
            type:String,
            default:""
        },

        photo:{
            type:String,
            default:""
        },

        description:{
            type:String,
            default:""
        }
    },

    events:[
        {
            eventName:{
                type:String
            },

            date:{
                type:Date
            },

            venue:{
                type:String
            },

            location:{
                type:String
            },

            description:{
                type:String,
                default:""
            }
        }
    ],

    gallery:[
        {
            type:String
        }
    ],

    musicUrl:{
        type:String,
        default:""
    },

    rsvpEnabled:{
        type:Boolean,
        default:true
    },

    guestCount:{
        type:Number,
        default:0
    },

    websiteViews:{
        type:Number,
        default:0
    },

    seoSettings:{
        title:{
            type:String,
            default:""
        },

        description:{
            type:String,
            default:""
        },

        keywords:[
            {
                type:String
            }
        ]
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Published",
            "Expired"
        ],
        default:"Draft"
    },

    isPremium:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingWebsite",
    weddingWebsiteSchema
);