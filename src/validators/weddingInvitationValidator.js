const { body } = require("express-validator");



const createWeddingInvitationValidator = [

    body("wedding")
        .notEmpty()
        .withMessage("Wedding ID is required."),



    body("invitationTitle")
        .notEmpty()
        .withMessage("Invitation title is required.")
        .trim(),



    body("invitationType")
        .optional()
        .isIn([
            "Digital Invitation",
            "Video Invitation",
            "Traditional Invitation",
            "Custom Invitation"
        ])
        .withMessage("Invalid invitation type."),



    body("status")
        .optional()
        .isIn([
            "Draft",
            "Published",
            "Archived"
        ])
        .withMessage("Invalid invitation status.")



];






const updateWeddingInvitationValidator = [

    body("invitationTitle")
        .optional()
        .trim(),



    body("invitationType")
        .optional()
        .isIn([
            "Digital Invitation",
            "Video Invitation",
            "Traditional Invitation",
            "Custom Invitation"
        ])
        .withMessage("Invalid invitation type."),



    body("status")
        .optional()
        .isIn([
            "Draft",
            "Published",
            "Archived"
        ])
        .withMessage("Invalid invitation status.")

];





module.exports = {

    createWeddingInvitationValidator,

    updateWeddingInvitationValidator

};