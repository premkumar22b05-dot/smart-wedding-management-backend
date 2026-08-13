const mongoose = require("mongoose");


const inventorySchema = new mongoose.Schema(
{
    itemName:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Decoration",
            "Furniture",
            "Lighting",
            "Sound System",
            "Equipment",
            "Transportation",
            "Other"
        ],
        required:true
    },

    description:{
        type:String,
        default:""
    },

    quantity:{
        type:Number,
        required:true,
        default:0
    },

    availableQuantity:{
        type:Number,
        default:0
    },

    unit:{
        type:String,
        enum:[
            "Piece",
            "Set",
            "Kg",
            "Meter",
            "Box",
            "Other"
        ],
        default:"Piece"
    },

    rentalPrice:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Available",
            "Reserved",
            "Out of Stock",
            "Maintenance"
        ],
        default:"Available"
    },

    imageUrl:{
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
    "Inventory",
    inventorySchema
);