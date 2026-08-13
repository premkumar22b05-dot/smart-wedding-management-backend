const mongoose = require("mongoose");


const aiChatHistorySchema = new mongoose.Schema(
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

    sessionId:{
        type:String,
        required:true
    },

    conversations:[
        {
            role:{
                type:String,
                enum:[
                    "User",
                    "AI"
                ],
                required:true
            },

            message:{
                type:String,
                required:true
            },

            intent:{
                type:String,
                default:""
            },

            generatedRecommendations:[
                {
                    itemId:{
                        type:mongoose.Schema.Types.ObjectId
                    },

                    itemType:{
                        type:String
                    }
                }
            ],

            timestamp:{
                type:Date,
                default:Date.now
            }
        }
    ],

    aiModel:{
        type:String,
        default:"Smart Wedding AI Assistant"
    },

    contextData:{
        type:Object,
        default:{}
    },

    userFeedback:{
        rating:{
            type:Number,
            min:1,
            max:5,
            default:null
        },

        comment:{
            type:String,
            default:""
        }
    },

    isArchived:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AIChatHistory",
    aiChatHistorySchema
);