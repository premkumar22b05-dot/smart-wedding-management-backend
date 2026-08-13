const mongoose = require("mongoose");


const analyticsSchema = new mongoose.Schema(
{
    wedding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wedding"
    },

    totalBudget:{
        type:Number,
        default:0
    },

    totalExpense:{
        type:Number,
        default:0
    },

    totalRevenue:{
        type:Number,
        default:0
    },

    totalBookings:{
        type:Number,
        default:0
    },

    completedBookings:{
        type:Number,
        default:0
    },

    pendingBookings:{
        type:Number,
        default:0
    },

    vendorPerformance:[
        {
            vendor:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Vendor"
            },

            totalBookings:{
                type:Number,
                default:0
            },

            rating:{
                type:Number,
                default:0
            },

            revenueGenerated:{
                type:Number,
                default:0
            }
        }
    ],

    popularServices:[
        {
            service:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Service"
            },

            bookingCount:{
                type:Number,
                default:0
            }
        }
    ],

    guestAnalytics:{
        totalGuests:{
            type:Number,
            default:0
        },

        acceptedGuests:{
            type:Number,
            default:0
        },

        declinedGuests:{
            type:Number,
            default:0
        }
    },

    generatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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
    "Analytics",
    analyticsSchema
);