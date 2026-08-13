const mongoose = require("mongoose");


const reportSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    generatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    reportTitle:{
        type:String,
        required:true,
        trim:true
    },

    reportType:{
        type:String,
        enum:[
            "Wedding Summary",
            "Financial Report",
            "Expense Report",
            "Vendor Performance",
            "Booking Report",
            "Guest Report",
            "AI Insight Report",
            "Other"
        ],
        required:true
    },

    description:{
        type:String,
        default:""
    },

    reportData:{
        type:Object,
        default:{}
    },

    fileUrl:{
        type:String,
        default:""
    },

    generatedFormat:{
        type:String,
        enum:[
            "PDF",
            "Excel",
            "CSV",
            "JSON"
        ],
        default:"PDF"
    },

    status:{
        type:String,
        enum:[
            "Generated",
            "Processing",
            "Failed"
        ],
        default:"Generated"
    },

    generatedDate:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Report",
    reportSchema
);