const mongoose = require("mongoose");


const budgetPlanSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    totalBudget:{
        type:Number,
        required:true
    },

    allocatedAmount:{
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

    categories:[
        {
            categoryName:{
                type:String,
                required:true
            },

            allocatedBudget:{
                type:Number,
                default:0
            },

            spentBudget:{
                type:Number,
                default:0
            },

            percentage:{
                type:Number,
                default:0
            }
        }
    ],

    budgetStatus:{
        type:String,
        enum:[
            "Within Budget",
            "Near Limit",
            "Exceeded"
        ],
        default:"Within Budget"
    },

    aiSuggestions:[
        {
            type:String
        }
    ],

    alertsEnabled:{
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
    "BudgetPlan",
    budgetPlanSchema
);