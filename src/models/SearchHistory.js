const mongoose = require("mongoose");


const searchHistorySchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    searchKeyword:{
        type:String,
        required:true,
        trim:true
    },

    searchType:{
        type:String,
        enum:[
            "Vendor",
            "Venue",
            "Service",
            "Package",
            "Wedding Idea",
            "Other"
        ],
        default:"Other"
    },

    filters:{
        location:{
            type:String,
            default:""
        },

        category:{
            type:String,
            default:""
        },

        budget:{
            type:Number,
            default:0
        },

        rating:{
            type:Number,
            default:0
        },

        guestCount:{
            type:Number,
            default:0
        }
    },

    searchedItems:[
        {
            itemId:{
                type:mongoose.Schema.Types.ObjectId
            },

            itemType:{
                type:String
            }
        }
    ],

    resultCount:{
        type:Number,
        default:0
    },

    selectedItem:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    },

    searchSource:{
        type:String,
        enum:[
            "Web",
            "Mobile",
            "AI Assistant"
        ],
        default:"Web"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "SearchHistory",
    searchHistorySchema
);