const mongoose = require("mongoose");


const notificationPreferenceSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    emailNotifications:{
        type:Boolean,
        default:true
    },

    smsNotifications:{
        type:Boolean,
        default:true
    },

    whatsappNotifications:{
        type:Boolean,
        default:false
    },

    pushNotifications:{
        type:Boolean,
        default:true
    },

    preferences:{
        bookingUpdates:{
            type:Boolean,
            default:true
        },

        paymentAlerts:{
            type:Boolean,
            default:true
        },

        vendorUpdates:{
            type:Boolean,
            default:true
        },

        weddingReminders:{
            type:Boolean,
            default:true
        },

        taskReminders:{
            type:Boolean,
            default:true
        },

        aiRecommendations:{
            type:Boolean,
            default:true
        },

        marketingMessages:{
            type:Boolean,
            default:false
        }
    },

    quietHours:{
        enabled:{
            type:Boolean,
            default:false
        },

        startTime:{
            type:String,
            default:"22:00"
        },

        endTime:{
            type:String,
            default:"07:00"
        }
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "NotificationPreference",
    notificationPreferenceSchema
);