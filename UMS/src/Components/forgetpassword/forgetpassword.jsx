import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Forgetpassword() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your password reset logic here
        console.log("Resetting password...");
    };
    return(

        <>
      <div className="resetpasswordbody">
            <div className="container resetpasswordcontainer">
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit} className="reset-password-form">
                    <label htmlFor="forgotNewpassword">New Password:</label>
                    <input
                        type="password"
                        id="forgotNewpassword"
                        name="new-password"
                        required
                    />
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        name="confirm-password"
                        required
                    />
                    <button type="submit" className="resetpasswordBtn">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}