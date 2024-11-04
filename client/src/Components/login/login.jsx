import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); 

    const login = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading
        console.log("Login button clicked...", email, password);

        const data = { email, password };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                alert(errorResponse.message);
                return;
            }

            const parsedResponse = await response.json();
            const { token, tokenId, loginCount, userTypes } = parsedResponse.data;

            // Store the token in localStorage
            localStorage.setItem(tokenId, token); // Use a constant key
            console.log("Token stored successfully.");

            // Navigate based on the user type and login count
            if (loginCount === 0) {
                navigate(`/passwordreset`);
            } else if (userTypes === 'Admin') {
                alert("Admin login successful");
                navigate(`/Admin?id=${tokenId}&login=${tokenId}`); // Send key instead of token
            } else if (userTypes === 'Employee') {
                alert("Employee login successful");
                navigate(`/Employee?id=${tokenId}&login=${tokenId}`); // Send key instead of token
            } else {
                alert("Unknown user type. Please contact support.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during login.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="index mt-5">
            <div className="indexbody">
                <div className="animated slideInLeft" id="square">
                    <div className="animated bounceInUp" id="leftSquare">
                        <div className="animated bounceInUp" id="circle">
                            <img
                                className="brand img-responsive"
                                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/branding.png"
                                alt="Brand Logo"
                            />
                        </div>
                        <h2 id="title">Welcome to Divider</h2>
                        <h3 id="subtitle">You are moments away from your first adventure.</h3>
                    </div>
                    <div className="animated bounceInDown" id="rightSquare">
                        <div id="container">
                            <h1 className="signup text-center">User Login and Management</h1>
                            <form className="text-center" onSubmit={login}>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control border-0 shadow-sm bg-body rounded mb-3"
                                    placeholder="Enter Your Email"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control border-0 shadow-sm bg-body rounded mb-3"
                                    placeholder="Enter Your Password"
                                    required
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="forgetpass text-start"
                                        onClick={() => alert("Forgot Password functionality not implemented.")}
                                    >
                                        Forgot Your Password?
                                    </button>
                                </div>
                                <input
                                    type="submit"
                                    value={loading ? "Logging in..." : "Login"}
                                    className="loginbtn"
                                    disabled={loading}
                                />
                            </form>
                            <h3 id="footer" className="text-center mt-3">
                                By continuing you agree to our{" "}
                                <span id="terms" onClick={() => alert("Terms and Conditions")}>
                                    terms &amp; conditions.
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
