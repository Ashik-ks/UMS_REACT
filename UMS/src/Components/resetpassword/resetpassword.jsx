import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function ResetPassword() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your password reset logic here
        console.log("Password reset submitted.");
    };

    return (
        <>
            <div className="resetpasswordbody">
                <div className="divbgimg" />
                <div className="resetformdiv">
                    <div className="resetpasswordcontainer">
                        <h1 className="resetformtext1">Reset Password</h1>
                        <form onSubmit={handleSubmit} className="reset-password-form">
                            <label htmlFor="resetpassword" className="resetformtext">
                                Current Password:
                            </label>
                            <input
                                type="password"
                                id="resetpassword"
                                className="resetpassword"
                                name="current-password"
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
                                required
                            />
                            <button type="submit" className="resetpasswordBtn">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
