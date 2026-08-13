const mongoose = require("mongoose");


const rsvpSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Guest",
        required:true
    },

    invitation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invitation"
    },

    responseStatus:{
        type:String,
        enum:[
            "Pending",
            "Accepted",
            "Declined",
            "Maybe"
        ],
        default:"Pending"
    },

    attendingEvents:[
        {
            eventName:{
                type:String,
                required:true
            },

            attending:{
                type:Boolean,
                default:true
            }
        }
    ],

    numberOfGuests:{
        type:Number,
        default:1
    },

    guestDetails:{
        name:{
            type:String,
            default:""
        },

        email:{
            type:String,
            default:""
        },

        phone:{
            type:String,
            default:""
        }
    },

    mealPreference:{
        type:String,
        enum:[
            "Vegetarian",
            "Non Vegetarian",
            "Vegan",
            "Jain",
            "No Preference"
        ],
        default:"No Preference"
    },

    accommodationRequired:{
        type:Boolean,
        default:false
    },

    transportationRequired:{
        type:Boolean,
        default:false
    },

    specialRequests:{
        type:String,
        default:""
    },

    respondedAt:{
        type:Date,
        default:null
    },

    reminderSent:{
        type:Boolean,
        default:false
    },

    qrCode:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "RSVP",
    rsvpSchema
);