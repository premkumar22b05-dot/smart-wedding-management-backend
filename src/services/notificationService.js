const Notification = require("../models/Notification");



/**
 * Create Notification
 */
const createNotification = async(data,userId)=>{


    const notification = new Notification({

        ...data,

        user:userId

    });


    await notification.save();



    return await Notification.findById(
        notification._id
    )
    .populate(
        "user",
        "name email role"
    )
    .populate(
        "wedding",
        "groomName brideName weddingDate budget status"
    );

};





/**
 * Get All Notifications
 */
const getAllNotifications = async(userId)=>{


    return await Notification.find({

        user:userId

    })
    .populate(
        "wedding",
        "groomName brideName weddingDate budget status"
    )
    .sort({
        createdAt:-1
    });

};





/**
 * Get Notification By ID
 */
const getNotificationById = async(
    id,
    userId
)=>{


    const notification =
    await Notification.findOne({

        _id:id,

        user:userId

    })
    .populate(
        "wedding",
        "groomName brideName weddingDate budget status"
    );


    if(!notification)
    {
        throw new Error(
            "Notification not found."
        );
    }


    return notification;

};





/**
 * Update Notification
 */
const updateNotification = async(
    id,
    data,
    userId
)=>{


    const notification =
    await Notification.findOneAndUpdate(

        {
            _id:id,
            user:userId
        },

        data,

        {
            new:true,
            runValidators:true
        }

    )
    .populate(
        "wedding",
        "groomName brideName weddingDate budget status"
    );



    if(!notification)
    {
        throw new Error(
            "Notification not found."
        );
    }


    return notification;

};





/**
 * Delete Notification
 */
const deleteNotification = async(
    id,
    userId
)=>{


    const notification =
    await Notification.findOneAndDelete({

        _id:id,

        user:userId

    });



    if(!notification)
    {
        throw new Error(
            "Notification not found."
        );
    }


    return notification;

};





module.exports = {

    createNotification,

    getAllNotifications,

    getNotificationById,

    updateNotification,

    deleteNotification

};