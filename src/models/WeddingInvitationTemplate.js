const mongoose = require("mongoose");


const weddingInvitationTemplateSchema = new mongoose.Schema(
{
    templateName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Traditional",
            "Modern",
            "Luxury",
            "Minimal",
            "Destination",
            "Religious",
            "Custom"
        ],
        default:"Custom"
    },

    description:{
        type:String,
        default:""
    },

    thumbnailUrl:{
        type:String,
        default:""
    },

    previewImages:[
        {
            type:String
        }
    ],

    invitationType:{
        type:String,
        enum:[
            "Digital Card",
            "Video Invitation",
            "Animated Invitation",
            "Website Invitation"
        ],
        default:"Digital Card"
    },

    supportedLanguages:[
        {
            type:String
        }
    ],

    customizationOptions:{
        allowNameChange:{
            type:Boolean,
            default:true
        },

        allowColorChange:{
            type:Boolean,
            default:true
        },

        allowMusic:{
            type:Boolean,
            default:false
        },

        allowPhotoUpload:{
            type:Boolean,
            default:true
        },

        allowVenueDetails:{
            type:Boolean,
            default:true
        }
    },

    designElements:{
        fonts:[
            {
                type:String
            }
        ],

        colors:[
            {
                type:String
            }
        ],

        layouts:[
            {
                type:String
            }
        ]
    },

    price:{
        type:Number,
        default:0
    },

    isPremium:{
        type:Boolean,
        default:false
    },

    aiGenerated:{
        type:Boolean,
        default:false
    },

    usageCount:{
        type:Number,
        default:0
    },

    isActive:{
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
    "WeddingInvitationTemplate",
    weddingInvitationTemplateSchema
);