const mongoose = require("mongoose");


const weddingBudgetSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },


    budgetName:{
        type:String,
        required:true,
        trim:true
    },


    totalBudget:{
        type:Number,
        required:true,
        default:0
    },


    currency:{
        type:String,
        default:"INR"
    },


    categories:[
        {
            categoryName:{
                type:String,
                enum:[
                    "Venue",
                    "Catering",
                    "Decoration",
                    "Photography",
                    "Videography",
                    "Wedding Dress",
                    "Invitation",
                    "Entertainment",
                    "Transportation",
                    "Accommodation",
                    "Jewellery",
                    "Other"
                ],
                default:"Other"
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


            percentage:{
                type:Number,
                default:0
            }
        }
    ],


    expenses:[
        {
            expenseTitle:{
                type:String,
                required:true
            },


            category:{
                type:String,
                default:"Other"
            },


            description:{
                type:String,
                default:""
            },


            amount:{
                type:Number,
                default:0
            },


            paymentStatus:{
                type:String,
                enum:[
                    "Pending",
                    "Partially Paid",
                    "Paid"
                ],
                default:"Pending"
            },


            paymentDate:{
                type:Date,
                default:null
            },


            receiptUrl:{
                type:String,
                default:""
            },


            addedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],


    paymentSummary:{
        totalPaid:{
            type:Number,
            default:0
        },


        totalPending:{
            type:Number,
            default:0
        },


        totalExpenses:{
            type:Number,
            default:0
        }
    },


    budgetAlerts:{
        enabled:{
            type:Boolean,
            default:true
        },


        thresholdPercentage:{
            type:Number,
            default:80
        },


        alerts:[
            {
                message:{
                    type:String,
                    default:""
                },

                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },


    aiBudgetAnalysis:{
        optimizedBudget:{
            type:Number,
            default:0
        },


        savingSuggestions:[
            {
                type:String
            }
        ],


        overspendingRisk:{
            type:Number,
            default:0
        },


        costPrediction:{
            type:Number,
            default:0
        }
    },


    approvalStatus:{
        type:String,
        enum:[
            "Draft",
            "Active",
            "Completed"
        ],
        default:"Draft"
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
    "WeddingBudget",
    weddingBudgetSchema
);