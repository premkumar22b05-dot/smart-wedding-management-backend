const mongoose = require("mongoose");


const weddingThemeLibrarySchema = new mongoose.Schema(
{
    themeName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Traditional",
            "Modern",
            "Luxury",
            "Minimal",
            "Royal",
            "Beach",
            "Garden",
            "Destination",
            "Vintage",
            "Custom"
        ],
        default:"Custom"
    },

    description:{
        type:String,
        default:""
    },

    coverImage:{
        type:String,
        default:""
    },

    inspirationImages:[
        {
            type:String
        }
    ],

    colorPalette:[
        {
            type:String
        }
    ],

    decorationStyle:{
        type:Object,
        default:{}
    },

    recommendedElements:[
        {
            type:String
        }
    ],

    suitableWeddingStyles:[
        {
            type:String
        }
    ],

    budgetRange:{
        minimum:{
            type:Number,
            default:0
        },

        maximum:{
            type:Number,
            default:0
        }
    },

    recommendedVendors:[
        {
            type:String
        }
    ],

    aiTags:[
        {
            type:String
        }
    ],

    popularityScore:{
        type:Number,
        default:0
    },

    usageCount:{
        type:Number,
        default:0
    },

    aiRecommended:{
        type:Boolean,
        default:false
    },

    isPremium:{
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
    "WeddingThemeLibrary",
    weddingThemeLibrarySchema
);