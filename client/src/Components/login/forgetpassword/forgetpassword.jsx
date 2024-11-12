import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Forgetpassword() {
 let params = new URLSearchParams(window.location.search);
let token = params.get('token');
console.log("token : ",token)

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const body = {
        newpassword: newPassword,
        confirmpassword: confirmPassword
    };

    // Function to handle the password reset
    const forgotPassword = async (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            // Replace fetch with axios
            const response = await axios.patch(
                `http://localhost:3000/reset-password`, 
                body, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log("Password reset result: ", response.data);

            // Check if the response is successful
            if (response.status === 200) {
                setSuccess("Password reset successful!");
                setTimeout(() => {
                    navigate('/'); // Redirect to the home page after success
                }, 1500);
            } else {
                setError(response.data.message || "Error resetting password");
            }
        } catch (error) {
            setError("An error occurred while resetting the password.");
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container forgetpasswordcontainer">
            <div className="row">
                <div className="col-3" />
                <div className="col mb-3 lh-lg">
                    <h1>Reset Your Password</h1>
                    <form onSubmit={forgotPassword} className="reset-password-form d-flex flex-column">
                        {/* Error and Success messages */}
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <label htmlFor="new-password" className="resetformtext ms-3">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="forgotNewpassword"
                            className="forgetpassdiv ms-3"
                            name="new-password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <label htmlFor="confirm-password" className="resetformtext ms-3">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            className="forgetpassdiv ms-3"
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="forgetpasswordBtn mt-3 ms-3 mb-3"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
                <div className="col-3" />
            </div>
        </div>
    );
}
