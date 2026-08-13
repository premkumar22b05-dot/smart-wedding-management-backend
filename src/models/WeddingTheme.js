const mongoose = require("mongoose");


const weddingThemeSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

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
            "Royal",
            "Beach",
            "Minimal",
            "Luxury",
            "Vintage",
            "Custom"
        ],
        default:"Custom"
    },

    description:{
        type:String,
        default:""
    },

    colorPalette:[
        {
            type:String
        }
    ],

    decorationStyle:{
        type:String,
        default:""
    },

    lightingStyle:{
        type:String,
        default:""
    },

    recommendedVendors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],

    aiGenerated:{
        type:Boolean,
        default:false
    },

    aiRecommendationReason:{
        type:String,
        default:""
    },

    images:[
        {
            type:String
        }
    ],

    status:{
        type:String,
        enum:[
            "Suggested",
            "Selected",
            "Completed"
        ],
        default:"Suggested"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingTheme",
    weddingThemeSchema
);