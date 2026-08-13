const mongoose = require("mongoose");


const packageSchema = new mongoose.Schema(
{
    packageName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Basic",
            "Premium",
            "Luxury",
            "Custom"
        ],
        default:"Basic"
    },

    description:{
        type:String,
        default:""
    },

    services:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service"
        }
    ],

    includedFeatures:[
        {
            type:String
        }
    ],

    price:{
        type:Number,
        required:true
    },

    duration:{
        type:String,
        default:"Full Wedding"
    },

    maxGuests:{
        type:Number,
        default:0
    },

    images:[
        {
            type:String
        }
    ],

    availability:{
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
    "Package",
    packageSchema
);