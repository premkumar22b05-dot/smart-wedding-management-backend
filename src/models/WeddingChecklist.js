const mongoose = require("mongoose");


const weddingChecklistSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    checklistName:{
        type:String,
        required:true,
        trim:true
    },


    description:{
        type:String,
        default:""
    },


    category:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Budget",
            "Guest Management",
            "Invitation",
            "Decoration",
            "Photography",
            "Catering",
            "Wedding Dress",
            "Travel",
            "Legal Documents",
            "Other"
        ],
        default:"Other"
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


            dueDate:{
                type:Date,
                default:null
            },


            assignedTo:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            ],


            status:{
                type:String,
                enum:[
                    "Pending",
                    "In Progress",
                    "Completed",
                    "Skipped"
                ],
                default:"Pending"
            },


            completedDate:{
                type:Date,
                default:null
            },


            notes:{
                type:String,
                default:""
            }
        }
    ],


    completionPercentage:{
        type:Number,
        default:0
    },


    aiSuggestions:[
        {
            suggestion:{
                type:String
            },


            priority:{
                type:String,
                enum:[
                    "Low",
                    "Medium",
                    "High"
                ],
                default:"Medium"
            }
        }
    ],


    reminderSettings:{
        enabled:{
            type:Boolean,
            default:true
        },


        reminderDaysBefore:{
            type:Number,
            default:3
        }
    },


    checklistType:{
        type:String,
        enum:[
            "Default Template",
            "Custom",
            "AI Generated"
        ],
        default:"Custom"
    },


    status:{
        type:String,
        enum:[
            "Active",
            "Completed",
            "Archived"
        ],
        default:"Active"
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
    "WeddingChecklist",
    weddingChecklistSchema
);