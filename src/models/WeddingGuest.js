const mongoose = require("mongoose");


const weddingGuestSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    guestName:{
        type:String,
        required:true,
        trim:true
    },


    relationship:{
        type:String,
        enum:[
            "Family",
            "Friend",
            "Relative",
            "Colleague",
            "VIP",
            "Other"
        ],
        default:"Other"
    },


    contactDetails:{
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


    familyGroup:{
        type:String,
        default:""
    },


    guestCategory:{
        type:String,
        enum:[
            "Bride Side",
            "Groom Side",
            "Common Guest",
            "VIP",
            "Other"
        ],
        default:"Common Guest"
    },


    invitationStatus:{
        type:String,
        enum:[
            "Not Sent",
            "Sent",
            "Viewed",
            "Accepted",
            "Declined",
            "Pending"
        ],
        default:"Not Sent"
    },


    rsvpDetails:{
        response:{
            type:String,
            enum:[
                "Attending",
                "Not Attending",
                "Maybe",
                "Pending"
            ],
            default:"Pending"
        },


        numberOfGuests:{
            type:Number,
            default:1
        },


        responseDate:{
            type:Date,
            default:null
        }
    },


    attendanceDetails:{
        checkedIn:{
            type:Boolean,
            default:false
        },


        checkInTime:{
            type:Date,
            default:null
        },


        tableNumber:{
            type:String,
            default:""
        }
    },


    foodPreferences:{
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


    specialRequirements:{
        type:String,
        default:""
    },


    accommodation:{
        required:{
            type:Boolean,
            default:false
        },


        hotelName:{
            type:String,
            default:""
        },


        roomNumber:{
            type:String,
            default:""
        },


        checkInDate:{
            type:Date,
            default:null
        },


        checkOutDate:{
            type:Date,
            default:null
        }
    },


    travelDetails:{
        arrivalTime:{
            type:Date,
            default:null
        },


        departureTime:{
            type:Date,
            default:null
        },


        transportRequired:{
            type:Boolean,
            default:false
        }
    },


    aiInsights:{
        guestImportanceScore:{
            type:Number,
            default:0
        },


        preferencesAnalysis:{
            type:String,
            default:""
        }
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
    "WeddingGuest",
    weddingGuestSchema
);