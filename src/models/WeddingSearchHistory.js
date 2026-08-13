const mongoose = require("mongoose");


const weddingSearchHistorySchema = new mongoose.Schema(
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


    searchType:{
        type:String,
        enum:[
            "Venue",
            "Vendor",
            "Package",
            "Theme",
            "Service",
            "Budget",
            "AI Query",
            "Other"
        ],
        default:"Other"
    },


    searchQuery:{
        type:String,
        required:true,
        trim:true
    },


    filtersApplied:{
        location:{
            type:String,
            default:""
        },

        budgetRange:{
            minimum:{
                type:Number,
                default:0
            },

            maximum:{
                type:Number,
                default:0
            }
        },

        category:{
            type:String,
            default:""
        },

        rating:{
            type:Number,
            default:0
        },

        preferences:{
            type:Object,
            default:{}
        }
    },


    searchResults:{
        totalResults:{
            type:Number,
            default:0
        },

        selectedResultId:{
            type:String,
            default:""
        },

        clickedResults:[
            {
                itemId:{
                    type:String
                },

                itemName:{
                    type:String
                },

                clickedAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },


    aiAnalysis:{
        userIntent:{
            type:String,
            default:""
        },

        interests:[
            {
                type:String
            }
        ],

        preferenceScore:{
            type:Number,
            default:0
        }
    },


    searchSource:{
        type:String,
        enum:[
            "Web",
            "Mobile App",
            "AI Assistant",
            "Admin Panel"
        ],
        default:"Web"
    },


    successfulSearch:{
        type:Boolean,
        default:false
    },


    convertedToBooking:{
        type:Boolean,
        default:false
    },


    searchedAt:{
        type:Date,
        default:Date.now
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
    "WeddingSearchHistory",
    weddingSearchHistorySchema
);