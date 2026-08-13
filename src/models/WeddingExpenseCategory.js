const mongoose = require("mongoose");


const weddingExpenseCategorySchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    categoryName:{
        type:String,
        required:true,
        trim:true
    },

    categoryType:{
        type:String,
        enum:[
            "Venue",
            "Catering",
            "Decoration",
            "Photography",
            "Videography",
            "Entertainment",
            "Invitation",
            "Transportation",
            "Accommodation",
            "Jewellery",
            "Clothing",
            "Makeup",
            "Guest Management",
            "Miscellaneous",
            "Other"
        ],
        default:"Other"
    },

    description:{
        type:String,
        default:""
    },

    allocatedBudget:{
        type:Number,
        default:0
    },

    spentAmount:{
        type:Number,
        default:0
    },

    remainingAmount:{
        type:Number,
        default:0
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

    aiRecommendedBudget:{
        type:Number,
        default:0
    },

    aiAnalysis:{
        type:Object,
        default:{}
    },

    isEssential:{
        type:Boolean,
        default:false
    },

    status:{
        type:String,
        enum:[
            "Active",
            "Completed",
            "Cancelled"
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
    "WeddingExpenseCategory",
    weddingExpenseCategorySchema
);