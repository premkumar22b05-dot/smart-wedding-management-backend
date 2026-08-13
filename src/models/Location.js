const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema(
{
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue"
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    locationName:{
        type:String,
        required:true,
        trim:true
    },

    address:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    state:{
        type:String,
        required:true
    },

    country:{
        type:String,
        default:"India"
    },

    pincode:{
        type:String,
        default:""
    },

    coordinates:{
        latitude:{
            type:Number,
            default:0
        },

        longitude:{
            type:Number,
            default:0
        }
    },

    mapUrl:{
        type:String,
        default:""
    },

    locationType:{
        type:String,
        enum:[
            "Venue",
            "Wedding Location",
            "Meeting Point",
            "Other"
        ],
        default:"Venue"
    },

    accessibility:{
        type:String,
        default:""
    },

    nearbyFacilities:[
        {
            type:String
        }
    ]

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Location",
    locationSchema
);