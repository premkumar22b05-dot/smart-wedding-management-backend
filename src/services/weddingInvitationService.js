const WeddingInvitation = require("../models/WeddingInvitation");





/**
 * Create Wedding Invitation
 */
const createWeddingInvitation = async (data, userId) => {


    const invitation = new WeddingInvitation({

        ...data,

        createdBy: userId

    });



    await invitation.save();



    return invitation;

};







/**
 * Get All Wedding Invitations
 */
const getAllWeddingInvitations = async (weddingId, userId) => {


    const invitations = await WeddingInvitation.find({

        wedding: weddingId,

        createdBy: userId

    })
    .sort({

        createdAt: -1

    });



    return invitations;

};









/**
 * Get Invitation By ID
 */
const getWeddingInvitationById = async (id, userId) => {


    const invitation = await WeddingInvitation.findOne({

        _id: id,

        createdBy: userId

    });



    if (!invitation) {

        throw new Error(
            "Wedding invitation not found."
        );

    }



    return invitation;

};









/**
 * Update Wedding Invitation
 */
const updateWeddingInvitation = async (

    id,

    data,

    userId

) => {


    const invitation = await WeddingInvitation.findOneAndUpdate(

        {
            _id: id,
            createdBy: userId
        },

        data,

        {
            new:true,
            runValidators:true
        }

    );



    if (!invitation) {

        throw new Error(
            "Wedding invitation not found."
        );

    }



    return invitation;

};









/**
 * Delete Wedding Invitation
 */
const deleteWeddingInvitation = async (

    id,

    userId

) => {


    const invitation = await WeddingInvitation.findOneAndDelete({

        _id:id,

        createdBy:userId

    });



    if (!invitation) {

        throw new Error(
            "Wedding invitation not found."
        );

    }



    return invitation;

};







module.exports = {


    createWeddingInvitation,

    getAllWeddingInvitations,

    getWeddingInvitationById,

    updateWeddingInvitation,

    deleteWeddingInvitation

};