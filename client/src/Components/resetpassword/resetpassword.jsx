import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResetPassword.css'; // Custom CSS for enhanced design

export default function Resetpassword() {
    // Getting the query parameters from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    console.log("id:", id);

    // Retrieving the token from localStorage using a key like 'authToken'
    const token = localStorage.getItem(id); // You should use 'authToken' or the appropriate key
    console.log("Token:", token);

    const navigate = useNavigate(); // Initialize navigate for redirecting

    // State to handle form data
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle the form submit for password reset
    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        console.log("Reset password button clicked...", newpassword, password);

        // Check if password and confirm password match
        // if (newpassword !== confirmPassword) {
        //     setError("Passwords do not match.");
        //     return;
        // }

        // Preparing the data to send in the PUT request
        const dataToSubmit = { password, newpassword };

        // Check if token exists
        if (!token) {
            setError("No token found, please log in.");
            return;
        }

        setLoading(true); // Show loading state

        try {
            const response = await axios.put(
                `http://localhost:3000/passwordreset/${id}`,
                dataToSubmit,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log("Employee Data after password reset: ", response.data);

            if (response.status === 200) {
                setSuccess("Password reset successful!");
                setTimeout(() => {
                    navigate('/'); // Redirect to the home page after success
                }, 1500); // Delay to show success message
            } else {
                setError(response.data.message || "Error resetting password");
            }
        } catch (error) {
            setError("An error occurred while resetting the password.");
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="reset-password-container">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Reset Your Password</h2>
                    <p className="text-center text-muted mb-4">
                        Follow the instructions to create a strong password.
                    </p>

                    {/* Display error or success message */}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleProfileSubmit}>
                        {/* Password Tips Section */}
                        <div className="password-tips mb-4">
                            <h5 className="text-primary">Choose a Strong Password</h5>
                            <ul>
                                <li><strong>Don't reuse passwords</strong> from other accounts.</li>
                                <li><strong>At least 8 characters</strong>: Use a minimum of 8 characters.</li>
                                <li><strong>Avoid obvious passwords</strong>: Don't use names or common phrases.</li>
                                <li><strong>Be cautious of staying signed in</strong> on shared devices.</li>
                            </ul>
                        </div>

                        {/* Current Password Input */}
                        <div className="form-group mb-3">
                            <label htmlFor="resetpassword" className="form-label">Current Password</label>
                            <input
                                type="password"
                                id="resetpassword"
                                className="form-control"
                                name="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* New Password Input */}
                        <div className="form-group mb-3">
                            <label htmlFor="newpassword" className="form-label">New Password</label>
                            <input
                                type="password"
                                id="newpassword"
                                className="form-control"
                                name="new-password"
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Confirm New Password Input
                        <div className="form-group mb-4">
                            <label htmlFor="confirmpassword" className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                className="form-control"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div> */}

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
