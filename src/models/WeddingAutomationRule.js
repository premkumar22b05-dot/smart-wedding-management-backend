const mongoose = require("mongoose");


const weddingAutomationRuleSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    ruleName:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        default:""
    },

    triggerType:{
        type:String,
        enum:[
            "Date Based",
            "Status Change",
            "Payment Event",
            "Task Event",
            "Guest Event",
            "Vendor Event",
            "AI Trigger",
            "Custom"
        ],
        default:"Custom"
    },

    triggerCondition:{
        type:Object,
        default:{}
    },

    actionType:{
        type:String,
        enum:[
            "Send Notification",
            "Create Task",
            "Update Status",
            "Send Email",
            "Send SMS",
            "Generate Report",
            "AI Recommendation",
            "Custom Action"
        ],
        default:"Send Notification"
    },

    actionDetails:{
        type:Object,
        default:{}
    },

    targetAudience:{
        type:String,
        enum:[
            "Bride",
            "Groom",
            "Family",
            "Guests",
            "Vendors",
            "All Users"
        ],
        default:"All Users"
    },

    executionCount:{
        type:Number,
        default:0
    },

    lastExecutedAt:{
        type:Date,
        default:null
    },

    nextExecutionAt:{
        type:Date,
        default:null
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
            "Active",
            "Paused",
            "Completed",
            "Disabled"
        ],
        default:"Active"
    },

    aiGenerated:{
        type:Boolean,
        default:false
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
    "WeddingAutomationRule",
    weddingAutomationRuleSchema
);