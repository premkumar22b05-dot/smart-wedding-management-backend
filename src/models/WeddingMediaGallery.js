const mongoose = require("mongoose");


const weddingMediaGallerySchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    albumName:{
        type:String,
        required:true,
        trim:true
    },

    albumType:{
        type:String,
        enum:[
            "Engagement",
            "Pre Wedding",
            "Wedding Ceremony",
            "Reception",
            "Family Moments",
            "Guest Uploads",
            "Other"
        ],
        default:"Other"
    },

    description:{
        type:String,
        default:""
    },

    mediaFiles:[
        {
            fileType:{
                type:String,
                enum:[
                    "Image",
                    "Video"
                ],
                default:"Image"
            },

            fileUrl:{
                type:String,
                required:true
            },

            thumbnailUrl:{
                type:String,
                default:""
            },

            title:{
                type:String,
                default:""
            },

            description:{
                type:String,
                default:""
            },

            uploadedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            uploadDate:{
                type:Date,
                default:Date.now
            }
        }
    ],

    aiAnalysis:{
        detectedObjects:[
            {
                type:String
            }
        ],

        detectedPeople:[
            {
                type:String
            }
        ],

        emotions:[
            {
                type:String
            }
        ],

        imageTags:[
            {
                type:String
            }
        ]
    },

    privacySettings:{
        visibility:{
            type:String,
            enum:[
                "Public",
                "Private",
                "Guests Only"
            ],
            default:"Private"
        },

        allowDownload:{
            type:Boolean,
            default:false
        },

        allowSharing:{
            type:Boolean,
            default:true
        }
    },

    sharedWith:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Guest"
        }
    ],

    totalViews:{
        type:Number,
        default:0
    },

    totalDownloads:{
        type:Number,
        default:0
    },

    isFeatured:{
        type:Boolean,
        default:false
    },

    aiOrganized:{
        type:Boolean,
        default:false
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
    "WeddingMediaGallery",
    weddingMediaGallerySchema
);