const mongoose = require("mongoose");


const weddingTaskSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    taskTitle:{
        type:String,
        required:true,
        trim:true
    },


    description:{
        type:String,
        default:""
    },


    taskCategory:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Guest Management",
            "Budget",
            "Invitation",
            "Decoration",
            "Photography",
            "Catering",
            "Travel",
            "Wedding Dress",
            "Documentation",
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


    assignedTo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    deadline:{
        type:Date,
        default:null
    },


    startDate:{
        type:Date,
        default:null
    },


    completedDate:{
        type:Date,
        default:null
    },


    status:{
        type:String,
        enum:[
            "Pending",
            "Assigned",
            "In Progress",
            "Completed",
            "Delayed",
            "Cancelled"
        ],
        default:"Pending"
    },


    progress:{
        type:Number,
        default:0,
        min:0,
        max:100
    },


    dependencies:[
        {
            taskId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"WeddingTask"
            },

            dependencyType:{
                type:String,
                default:"Requires Completion"
            }
        }
    ],


    attachments:[
        {
            fileName:{
                type:String,
                default:""
            },

            fileUrl:{
                type:String,
                default:""
            }
        }
    ],


    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            message:{
                type:String,
                default:""
            },

            commentedAt:{
                type:Date,
                default:Date.now
            }
        }
    ],


    reminder:{
        enabled:{
            type:Boolean,
            default:true
        },

        reminderDate:{
            type:Date,
            default:null
        }
    },


    aiPriorityAnalysis:{
        urgencyScore:{
            type:Number,
            default:0
        },

        delayRisk:{
            type:Number,
            default:0
        },

        aiSuggestion:{
            type:String,
            default:""
        }
    },


    recurringTask:{
        enabled:{
            type:Boolean,
            default:false
        },

        frequency:{
            type:String,
            enum:[
                "Daily",
                "Weekly",
                "Monthly"
            ],
            default:"Weekly"
        }
    },


    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingTask",
    weddingTaskSchema
);
