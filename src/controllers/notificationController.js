const notificationService =
require("../services/notificationService");





const create = async(req,res)=>{

    try{


        const notification =
        await notificationService.createNotification(

            req.body,

            req.user._id

        );


        res.status(201).json({

            success:true,

            message:
            "Notification created successfully.",

            notification

        });


    }
    catch(error)
    {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};







const getAll = async(req,res)=>{

    try{


        const notifications =
        await notificationService.getAllNotifications(

            req.user._id

        );


        res.json({

            success:true,

            count:notifications.length,

            notifications

        });


    }
    catch(error)
    {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







const getById = async(req,res)=>{

    try{


        const notification =
        await notificationService.getNotificationById(

            req.params.id,

            req.user._id

        );


        res.json({

            success:true,

            notification

        });


    }
    catch(error)
    {

        res.status(404).json({

            success:false,

            message:error.message

        });

    }

};







const update = async(req,res)=>{

    try{


        const notification =
        await notificationService.updateNotification(

            req.params.id,

            req.body,

            req.user._id

        );


        res.json({

            success:true,

            message:
            "Notification updated successfully.",

            notification

        });


    }
    catch(error)
    {

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};







const remove = async(req,res)=>{

    try{


        await notificationService.deleteNotification(

            req.params.id,

            req.user._id

        );


        res.json({

            success:true,

            message:
            "Notification deleted successfully."

        });


    }
    catch(error)
    {

        res.status(404).json({

            success:false,

            message:error.message

        });

    }

};





module.exports={

    create,

    getAll,

    getById,

    update,

    remove

};