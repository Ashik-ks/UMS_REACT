const express = require('express');
const router = express.Router();
const authController = require('../userController/authController');
const accessControl = require('../utils/access-control').accessControl

function setAccessControl(access_types) {

    return(req,res,next) => {
        accessControl(access_types,req,res,next);
    }
}

router.post('/login',setAccessControl("*"),authController.login);
router.put('/passwordreset/:id',setAccessControl("*"),authController.passwordreset);
router.post('/forgot-password',setAccessControl('*') ,authController.forgotPasswordController);
router.patch('/reset-password', setAccessControl('*') ,authController.passwordResetController);

module.exports = router;