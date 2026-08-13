const mongoose = require("mongoose");


const seatingArrangementSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding",
        required:true
    },

    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue"
    },

    arrangementName:{
        type:String,
        required:true,
        trim:true
    },

    seatingType:{
        type:String,
        enum:[
            "Round Table",
            "Banquet",
            "Theatre Style",
            "Open Seating",
            "Custom"
        ],
        default:"Round Table"
    },

    tables:[
        {
            tableNumber:{
                type:String,
                required:true
            },

            capacity:{
                type:Number,
                default:10
            },

            location:{
                type:String,
                default:""
            },

            guests:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Guest"
                }
            ],

            tableCategory:{
                type:String,
                enum:[
                    "VIP",
                    "Family",
                    "Friends",
                    "General",
                    "Special"
                ],
                default:"General"
            },

            notes:{
                type:String,
                default:""
            }
        }
    ],

    specialArrangements:[
        {
            guest:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Guest"
            },

            requirement:{
                type:String,
                default:""
            }
        }
    ],

    totalTables:{
        type:Number,
        default:0
    },

    totalGuestsAllocated:{
        type:Number,
        default:0
    },

    aiOptimized:{
        type:Boolean,
        default:false
    },

    optimizationScore:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Confirmed",
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
    "SeatingArrangement",
    seatingArrangementSchema
);