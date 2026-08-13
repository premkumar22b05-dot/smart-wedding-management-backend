const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
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

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    dueDate:{
        type:Date,
        required:true
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

    status:{
        type:String,
        enum:[
            "Pending",
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default:"Pending"
    },

    completedAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Task",
    taskSchema
);