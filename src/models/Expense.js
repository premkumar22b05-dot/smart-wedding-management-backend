const mongoose = require("mongoose");


const expenseSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    category:{
        type:String,
        enum:[
            "Venue",
            "Catering",
            "Decoration",
            "Photography",
            "Entertainment",
            "Transportation",
            "Invitation",
            "Clothing",
            "Jewellery",
            "Other"
        ],
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

    amount:{
        type:Number,
        required:true
    },

    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Paid",
            "Partially Paid"
        ],
        default:"Pending"
    },

    paymentMethod:{
        type:String,
        enum:[
            "Cash",
            "Card",
            "UPI",
            "Bank Transfer",
            "Online"
        ],
        default:"UPI"
    },

    receiptUrl:{
        type:String,
        default:""
    },

    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Expense",
    expenseSchema
);