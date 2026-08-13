const mongoose = require("mongoose");


const weddingTaskAssignmentSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    assignedRole:{
        type:String,
        enum:[
            "Bride",
            "Groom",
            "Family Member",
            "Wedding Planner",
            "Vendor",
            "Coordinator",
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

    startDate:{
        type:Date,
        default:null
    },

    dueDate:{
        type:Date,
        required:true
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

    progressPercentage:{
        type:Number,
        default:0
    },

    attachments:[
        {
            type:String
        }
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            message:{
                type:String
            },

            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],

    reminderEnabled:{
        type:Boolean,
        default:true
    },

    aiSuggested:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "WeddingTaskAssignment",
    weddingTaskAssignmentSchema
);