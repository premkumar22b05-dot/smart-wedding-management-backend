const { validationResult } = require("express-validator");


const {
    createWeddingInvitation,
    getAllWeddingInvitations,
    getWeddingInvitationById,
    updateWeddingInvitation,
    deleteWeddingInvitation
} = require("../services/weddingInvitationService");





/**
 * Create Wedding Invitation
 */
const create = async (req, res) => {

    try {


        const errors = validationResult(req);



        if (!errors.isEmpty()) {

            return res.status(400).json({

                success:false,

                errors:errors.array()

            });

        }





        const invitation = await createWeddingInvitation(

            req.body,

            req.user._id

        );





        res.status(201).json({

            success:true,

            message:"Wedding invitation created successfully.",

            invitation

        });




    } catch(error) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};









/**
 * Get All Wedding Invitations
 */
const getAll = async (req,res) => {


    try {


        const {
            weddingId
        } = req.query;





        const invitations = await getAllWeddingInvitations(

            weddingId,

            req.user._id

        );





        res.status(200).json({

            success:true,

            count:invitations.length,

            invitations

        });




    } catch(error) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};









/**
 * Get Single Wedding Invitation
 */
const getById = async (req,res) => {


    try {


        const invitation = await getWeddingInvitationById(

            req.params.id,

            req.user._id

        );





        res.status(200).json({

            success:true,

            invitation

        });





    } catch(error) {


        res.status(404).json({

            success:false,

            message:error.message

        });


    }

};









/**
 * Update Wedding Invitation
 */
const update = async (req,res) => {


    try {


        const errors = validationResult(req);



        if (!errors.isEmpty()) {


            return res.status(400).json({

                success:false,

                errors:errors.array()

            });


        }






        const invitation = await updateWeddingInvitation(

            req.params.id,

            req.body,

            req.user._id

        );





        res.status(200).json({

            success:true,

            message:"Wedding invitation updated successfully.",

            invitation

        });





    } catch(error) {


        res.status(404).json({

            success:false,

            message:error.message

        });


    }

};









/**
 * Delete Wedding Invitation
 */
const remove = async (req,res) => {


    try {


        await deleteWeddingInvitation(

            req.params.id,

            req.user._id

        );





        res.status(200).json({

            success:true,

            message:"Wedding invitation deleted successfully."

        });





    } catch(error) {


        res.status(404).json({

            success:false,

            message:error.message

        });


    }

};







module.exports = {

    create,

    getAll,

    getById,

    update,

    remove

};