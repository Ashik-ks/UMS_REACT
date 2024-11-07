import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Emailverification() {

    const [email,Setemail] = useState('')

const emailverify = (async ()=> {
    const body = {
        email
    }
   

    try {
        const response = await fetch(`http://localhost:3000/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body:JSON.stringify(body),
        });
  
        if (response.ok) {
          alert("Email verified succefully");
          navigate(`/`);
        } else {
          alert("Email verification failed");
        }
      } catch (error) {
        console.error("Error verify email:", error);
        alert("An error occurred while verify email");
      }
})


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
                        <form id="verification-form" className="mb-4" onSubmit={emailverify}>
                            <label htmlFor="forgotemail" className="fs-6 fw-bold forgotemail">
                                Enter Your Email:
                            </label>
                            <input
                                type="email"
                                id="forgotemail"
                                name="email"
                                onChange={(e) => Setemail(e.target.value)}
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