import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle the form submit for password reset
    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        console.log("Reset password button clicked...", newpassword, password);

        // Preparing the data to send in the PUT request
        const dataToSubmit = { password, newpassword };

        // Check if token exists
        if (!token) {
            setError("No token found, please log in.");
            return;
        }

        setLoading(true); // Show loading state

        try {
            const response = await fetch(`http://localhost:3000/passwordreset/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSubmit),
            });

            const result = await response.json();
            console.log("Employee Data after password reset: ", result);

            if (response.ok) {
                setSuccess("Password reset successful!");
                setTimeout(() => {
                    navigate('/'); // Redirect to the home page after success
                }, 1500); // Delay to show success message
            } else {
                setError(result.message || "Error resetting password");
            }
        } catch (error) {
            setError("An error occurred while resetting the password.");
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <>
            <div className="resetpasswordbody">
                <div className="divbgimg" />
                <div className="resetformdiv">
                    <div className="resetpasswordcontainer">
                        <h1 className="resetformtext1">Reset Password</h1>

                        {/* Display error or success message */}
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleProfileSubmit} className="reset-password-form">
                            <label htmlFor="resetpassword" className="resetformtext">
                                Current Password:
                            </label>
                            <input
                                type="password"
                                id="resetpassword"
                                className="resetpassword"
                                name="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            
                            <label htmlFor="newpassword" className="resetformtext">
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="newpassword"
                                className="resetpassword mb-4"
                                name="new-password"
                                value={newpassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            
                            <button type="submit" className="resetpasswordBtn" disabled={loading}>
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

