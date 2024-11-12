const success_function = require('../utils/responsehandler').success_function;
const error_function = require('../utils/responsehandler').error_function;
const { users } = require('../db/model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = require("../utils/send-email").sendEmail;
const resetPassword =require("../utils/email-templates/resetPassword").resetPassword;


exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log("body",req.body)

        // Validate input
        if (!email) {
            const response = error_function({
                success: false,
                statuscode: 400, 
                message: "Email is required",
            });
            return res.status(response.statuscode).send(response);
            return;
        }
        
        if (!password) {
            const response = error_function({
                success: false,
                statuscode: 400, 
                message: "Password is required",
            });
            return res.status(response.statuscode).send(response);
        }

        console.log("Email: ", email);
        console.log("Password: ", password);

        // Find the user by email
        const user = await users.findOne({ email });
        console.log("User: ", user);

        if (!user) {
            return res.status(404).send(error_function({
                statuscode: 404,
                message: "User not found",
            }));
        }

        // Check if the user has a password reset token
        if (user.password_token) {
            return res.status(400).send(error_function({
                statuscode: 400,
                message: "Please reset your password using the link sent to your email.",
            }));
        }

        // Verify the password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        console.log("Password Match: ", passwordMatch);

        if (!passwordMatch) {
            return res.status(400).send(error_function({
                statuscode: 400,
                message: "Invalid password",
            }));
        }

        // Generate a JWT token
        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });
        console.log("Token: ", token);

        const responseData = {
            token,
            userTypes: user.userType,
            tokenId: user._id,
            loginCount: user.loginCount,
        };
        console.log("Response Data: ", responseData);

        const response = success_function({
            statuscode: 200,
            data: responseData,
            message: "Login successful",
        });

        return res.status(response.statuscode).send(response);

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send(error_function({
            statuscode: 400,
            message: error.message || "Something went wrong",
        }));
    }
};


exports.passwordreset = async function (req, res) {
    try {
        let _id = req.params.id;
        console.log("_id: ", _id);

        // Find the user by ID
        let user = await users.findOne({ _id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        console.log("User found: ", user.username || user._id); // Log only non-sensitive info

        // Check if the provided current password matches the stored password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password Match: ", passwordMatch);

        if (!passwordMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid current password",
            });
        }

        // Check if the new password is the same as the current password
        if (req.body.password === req.body.newpassword) {
            return res.status(400).send({
                success: false,
                message: "New password must be different from the current password",
            });
        }

        // Hash the new password
        let hashedNewPassword;
        try {
            hashedNewPassword = await bcrypt.hash(req.body.newpassword, 10);
            console.log("Hashed New Password: ", hashedNewPassword); // Don't log full password hash in production!
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: "Error hashing new password",
            });
        }

        // Update the user's password in the database
        let updateUser = await users.updateOne({ _id }, { $set: { password: hashedNewPassword } });
        console.log("Update User Result: ", updateUser);

        // Check if the update was successful
        if (updateUser.modifiedCount > 0) {
            // Increment login count
            user.loginCount = (user.loginCount || 0) + 1;
            await user.save(); // Save the updated login count

            return res.status(200).send({
                success: true,
                message: "Password updated successfully",
                loginCount: user.loginCount, // Return the updated login count
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Password update failed",
            });
        }

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while resetting the password",
        });
    }
};



exports.forgotPasswordController = async function (req, res) {
    try {

        let email = req.body.email;
        console.log("email : ", email);

        if (email) {
            let user = await users.findOne({ email: email });
            console.log("user : ", user);
            if (user) {
                let reset_token = jwt.sign(
                    { user_id: user._id },
                    process.env.PRIVATE_KEY,
                    { expiresIn: "10m" }
                );
                console.log("reset_token : ", reset_token);

                let data = await users.updateOne(
                    { email: email },
                    { $set: { password_token: reset_token } }
                );
                if (data.matchedCount === 1 && data.modifiedCount == 1) {
                    // let reset_link = `${process.env.FRONTEND_URL}?token=${reset_token}`;
                    // let email_template = await resetPassword(user.name, reset_link);
                    sendEmail(email, "Forgot password", email_template);
                    let response = success_function({
                        statuscode: 200,
                        message: "Email sent successfully",
                    });
                    res.status(response.statuscode).send(response);
                    return;
                }
            }
        }
    } catch (error) {

        console.log("error : ", error);
        let response = {
            success: false,
            statuscode: 500,
            message: "Email verification failed",
        };
        res.status(response.statuscode).send(response);
    }
}

exports.passwordResetController = async function (req, res) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        console.log("token : ",token)

        let password = req.body.confirmpassword;
        console.log("password : ",password)

        decoded = jwt.decode(token);
        //console.log("user_id : ", decoded.user_id);
        //console.log("Token : ", token);
        let user = await users.findOne({
            $and: [{ _id: decoded.user_id }, { password_token: token }],
        });
        if (user) {
            let salt = bcrypt.genSaltSync(10);
            let password_hash = bcrypt.hashSync(password, salt);
            let data = await users.updateOne(
                { _id: decoded.user_id },
                { $set: { password: password_hash, password_token: null } }
            );
            if (data.matchedCount === 1 && data.modifiedCount == 1) {
                let response = success_function({
                    statuscode: 200,
                    message: "Password changed successfully",
                });
                res.status(response.statuscode).send(response);
                return;
            } else if (data.matchedCount === 0) {
                let response = error_function({
                    statuscode: 404,
                    message: "User not found",
                });
                res.status(response.statuscode).send(response);
                return;
            } else {
                let response = error_function({
                    statuscode: 400,
                    message: "Password reset failed",
                });
                res.status(response.statuscode).send(response);
                return;
            }
        } else {
            let response = error_function({ statuscode: 403, message: "Forbidden" });
            res.status(response.statuscode).send(response);
            return;
        }
    } catch (error) {
        if (process.env.NODE_ENV == "production") {
            let response = error_function({
                statuscode: 400,
                message: error
                    ? error.message
                        ? error.message
                        : error
                    : "Something went wrong",
            });

            res.status(response.statuscode).send(response);
            return;
        } else {
            let response = error_function({ statuscode: 400, message: error });
            res.status(response.statuscode).send(response);
            return;
        }
    }
};