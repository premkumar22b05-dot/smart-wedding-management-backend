const mongoose = require("mongoose");


const weddingGuestGroupSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    groupName:{
        type:String,
        required:true,
        trim:true
    },

    groupType:{
        type:String,
        enum:[
            "Bride Family",
            "Groom Family",
            "Friends",
            "Relatives",
            "VIP Guests",
            "Colleagues",
            "Special Guests",
            "Other"
        ],
        default:"Other"
    },

    description:{
        type:String,
        default:""
    },

    guests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Guest"
        }
    ],

    priority:{
        type:String,
        enum:[
            "Normal",
            "Important",
            "VIP"
        ],
        default:"Normal"
    },

    seatingPreference:{
        tableNumber:{
            type:String,
            default:""
        },

        section:{
            type:String,
            default:""
        },

        specialArrangement:{
            type:String,
            default:""
        }
    },

    communicationPreference:{
        sendEmail:{
            type:Boolean,
            default:true
        },

        sendSMS:{
            type:Boolean,
            default:false
        },

        sendWhatsApp:{
            type:Boolean,
            default:true
        }
    },

    mealPreferenceSummary:{
        vegetarianCount:{
            type:Number,
            default:0
        },

        nonVegetarianCount:{
            type:Number,
            default:0
        },

        specialRequests:{
            type:Number,
            default:0
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
    "WeddingGuestGroup",
    weddingGuestGroupSchema
);