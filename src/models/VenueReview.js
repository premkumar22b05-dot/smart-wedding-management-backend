const mongoose = require("mongoose");


const venueReviewSchema = new mongoose.Schema(
{
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    review:{
        type:String,
        required:true
    },

    images:[
        {
            type:String
        }
    ],

    locationRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    cleanlinessRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    facilityRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    hospitalityRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    valueRating:{
        type:Number,
        min:1,
        max:5,
        default:5
    },

    venueResponse:{
        type:String,
        default:""
    },

    responseDate:{
        type:Date,
        default:null
    },

    isVerifiedBooking:{
        type:Boolean,
        default:false
    },

    helpfulCount:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Rejected"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "VenueReview",
    venueReviewSchema
);