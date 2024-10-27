import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Emailverification() {
    return (
        <>
            <div className="verification-body">
                <div className="container d-flex align-items-center justify-content-center vh-100">
                    <div className="col-md-4 form-container">
                        <h1 className="text-center form-title">Email Verification</h1>
                        <p className="text-center">
                            We’ve sent a verification email to <strong>example@example.com</strong>.
                            Please check your inbox and click the link to verify your email.
                        </p>
                        <form id="verification-form" className="mb-4" onsubmit="emailverify(event)">
                            <label htmlFor="forgotemail" className="fs-6 fw-bold forgotemail">
                                Enter Your Email:
                            </label>
                            <input
                                type="email"
                                id="forgotemail"
                                name="email"
                                className="form-control"
                                required=""
                            />
                            <button type="submit" className="verifybtn  mt-3">
                                Verify Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}