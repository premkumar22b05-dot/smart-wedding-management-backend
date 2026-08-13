const mongoose = require("mongoose");


const weddingInvitationSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    invitationTitle:{
        type:String,
        required:true,
        trim:true
    },


    invitationType:{
        type:String,
        enum:[
            "Digital Invitation",
            "Video Invitation",
            "Traditional Invitation",
            "Custom Invitation"
        ],
        default:"Digital Invitation"
    },


    templateDetails:{
        templateName:{
            type:String,
            default:""
        },

        theme:{
            type:String,
            default:""
        },

        colorScheme:{
            type:String,
            default:""
        },

        designUrl:{
            type:String,
            default:""
        }
    },


    eventDetails:[
        {
            eventName:{
                type:String,
                required:true
            },

            eventDate:{
                type:Date,
                required:true
            },

            eventTime:{
                type:String,
                default:""
            },

            venue:{
                type:String,
                default:""
            },

            description:{
                type:String,
                default:""
            }
        }
    ],


    invitationContent:{
        message:{
            type:String,
            default:""
        },

        brideName:{
            type:String,
            default:""
        },

        groomName:{
            type:String,
            default:""
        },

        familyDetails:{
            type:String,
            default:""
        }
    },


    guestInvitations:[
        {
            guest:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Guest"
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

            sentDate:{
                type:Date,
                default:null
            },

            viewedDate:{
                type:Date,
                default:null
            },

            responseDate:{
                type:Date,
                default:null
            }
        }
    ],


    rsvpSettings:{
        enabled:{
            type:Boolean,
            default:true
        },

        deadline:{
            type:Date,
            default:null
        },

        allowGuestMessage:{
            type:Boolean,
            default:true
        }
    },


    invitationLink:{
        type:String,
        default:""
    },


    qrCode:{
        type:String,
        default:""
    },


    analytics:{
        totalSent:{
            type:Number,
            default:0
        },

        totalViewed:{
            type:Number,
            default:0
        },

        acceptedCount:{
            type:Number,
            default:0
        },

        declinedCount:{
            type:Number,
            default:0
        },

        pendingCount:{
            type:Number,
            default:0
        }
    },


    aiFeatures:{
        generatedByAI:{
            type:Boolean,
            default:false
        },

        aiSuggestions:[
            {
                type:String
            }
        ]
    },


    status:{
        type:String,
        enum:[
            "Draft",
            "Published",
            "Archived"
        ],
        default:"Draft"
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
    "WeddingInvitation",
    weddingInvitationSchema
);