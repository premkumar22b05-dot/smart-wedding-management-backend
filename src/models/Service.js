const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema(
{
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor",
        required:true
    },

    serviceName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Catering",
            "Decoration",
            "Photography",
            "Videography",
            "Makeup",
            "Entertainment",
            "Transportation",
            "Invitation",
            "Other"
        ],
        required:true
    },

    description:{
        type:String,
        default:""
    },

    packageName:{
        type:String,
        default:"Standard Package"
    },

    price:{
        type:Number,
        required:true
    },

    duration:{
        type:String,
        default:""
    },

    features:[
        {
            type:String
        }
    ],

    images:[
        {
            type:String
        }
    ],

    availability:{
        type:Boolean,
        default:true
    },

    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Service",
    serviceSchema
);