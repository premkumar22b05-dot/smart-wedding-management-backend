const mongoose = require("mongoose");


const weddingNotificationPreferenceSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    notificationChannels:{
        email:{
            enabled:{
                type:Boolean,
                default:true
            }
        },

        sms:{
            enabled:{
                type:Boolean,
                default:true
            }
        },

        whatsapp:{
            enabled:{
                type:Boolean,
                default:true
            }
        },

        pushNotification:{
            enabled:{
                type:Boolean,
                default:true
            }
        }
    },


    notificationTypes:{
        weddingReminder:{
            type:Boolean,
            default:true
        },

        paymentReminder:{
            type:Boolean,
            default:true
        },

        vendorUpdates:{
            type:Boolean,
            default:true
        },

        guestUpdates:{
            type:Boolean,
            default:true
        },

        aiRecommendations:{
            type:Boolean,
            default:true
        },

        taskUpdates:{
            type:Boolean,
            default:true
        },

        offersAndPromotions:{
            type:Boolean,
            default:false
        }
    },


    reminderSettings:{
        advanceReminderDays:{
            type:Number,
            default:3
        },

        preferredTime:{
            type:String,
            default:"09:00 AM"
        },

        timezone:{
            type:String,
            default:"Asia/Kolkata"
        }
    },


    quietHours:{
        enabled:{
            type:Boolean,
            default:false
        },

        startTime:{
            type:String,
            default:"10:00 PM"
        },

        endTime:{
            type:String,
            default:"07:00 AM"
        }
    },


    languagePreference:{
        type:String,
        enum:[
            "English",
            "Tamil",
            "Hindi",
            "Other"
        ],
        default:"English"
    },


    aiPersonalization:{
        enabled:{
            type:Boolean,
            default:true
        },

        personalizedSuggestions:{
            type:Boolean,
            default:true
        }
    },


    lastNotificationSent:{
        type:Date,
        default:null
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
    "WeddingNotificationPreference",
    weddingNotificationPreferenceSchema
);