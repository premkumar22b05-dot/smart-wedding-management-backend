const mongoose = require("mongoose");


const weddingChecklistTemplateSchema = new mongoose.Schema(
{
    templateName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Traditional Wedding",
            "Modern Wedding",
            "Destination Wedding",
            "Luxury Wedding",
            "Budget Wedding",
            "Custom"
        ],
        default:"Custom"
    },

    description:{
        type:String,
        default:""
    },

    tasks:[
        {
            taskName:{
                type:String,
                required:true
            },

            description:{
                type:String,
                default:""
            },

            category:{
                type:String,
                enum:[
                    "Venue",
                    "Catering",
                    "Decoration",
                    "Photography",
                    "Guest Management",
                    "Invitation",
                    "Transportation",
                    "Entertainment",
                    "Finance",
                    "Other"
                ],
                default:"Other"
            },

            priority:{
                type:String,
                enum:[
                    "Low",
                    "Medium",
                    "High",
                    "Critical"
                ],
                default:"Medium"
            },

            suggestedDaysBeforeWedding:{
                type:Number,
                default:30
            },

            isMandatory:{
                type:Boolean,
                default:false
            }
        }
    ],

    suitableForGuestRange:{
        min:{
            type:Number,
            default:0
        },

        max:{
            type:Number,
            default:0
        }
    },

    estimatedBudgetRange:{
        minimum:{
            type:Number,
            default:0
        },

        maximum:{
            type:Number,
            default:0
        }
    },

    aiGenerated:{
        type:Boolean,
        default:false
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
    "WeddingChecklistTemplate",
    weddingChecklistTemplateSchema
);
