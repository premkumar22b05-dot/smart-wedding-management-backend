const mongoose = require("mongoose");


const supportTicketSchema = new mongoose.Schema(
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

    subject:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:[
            "Payment Issue",
            "Booking Issue",
            "Vendor Issue",
            "Technical Issue",
            "Account Issue",
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
            "Urgent"
        ],
        default:"Medium"
    },

    status:{
        type:String,
        enum:[
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ],
        default:"Open"
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    attachments:[
        {
            type:String
        }
    ],

    adminResponse:{
        type:String,
        default:""
    },

    resolvedAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "SupportTicket",
    supportTicketSchema
);