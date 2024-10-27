import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
    const handleFilter = (value) => {
        // Your filter logic here
        console.log(`Filtering by: ${value}`);
    };

    const handlePasswordReset = (event) => {
        event.preventDefault();
        // Your password reset logic here
        console.log("Password reset submitted");
    };

    const handleLogout = () => {
        // Your logout logic here
        console.log("Logged out");
    };

    return (
        <div className="adduser">
            <div className="container-fluid adminpage">
                <header>
                    <div className="logo fs-6 fw-bold p-4">UMS Admin</div>
                </header>
                <nav className="sidebar">
                    <ul>
                        <li>Dashboard</li>
                        <li className="active">
                            <button id="fetchvalue1" onClick={() => handleFilter('')}>
                                Users
                            </button>
                        </li>
                        <li>
                            <Link to="/Adduser" className="adduser-link ">
                                Add Users
                            </Link>
                        </li>
                        <li>
                            <button id="fetchvalue3" onClick={() => handleFilter('Employee')}>
                                Employee
                            </button>
                        </li>
                        <li>
                            <button
                                className="settings border-0"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                            >
                                <span className="settings text-light">Settings</span>
                            </button>
                            <div
                                className="offcanvas offcanvas-end"
                                tabIndex={-1}
                                id="offcanvasRight"
                                aria-labelledby="offcanvasRightLabel"
                            >
                                <div className="offcanvas-header">
                                    <h5 id="offcanvasRightLabel" className="fs-5 fw-bold text-dark text-decoration-underline mt-3 ms-4">
                                        Profile Settings
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="offcanvas-body">
                                    <form onSubmit={handlePasswordReset} id="resetform">
                                        <div className="mb-3 text-dark">
                                            <label htmlFor="password">Current Password:</label>
                                            <input
                                                type="password"
                                                id="resetpassword"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter Current password"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 text-dark">
                                            <label htmlFor="newpassword">New Password:</label>
                                            <input
                                                type="password"
                                                id="newpassword"
                                                name="newpassword"
                                                className="form-control"
                                                placeholder="Enter New password"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="editbtn1 mt-2">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-link border-0 text-light">
                                Logout
                            </button>
                            <div id="logoutdiv">
                                <div className="text-danger fs-6">Are you sure?</div>
                                <div className="d-flex gap-3">
                                    <span className="text-danger spanbody" onClick={handleLogout}>
                                        Yes
                                    </span>
                                    <span className="text-danger spanbody" onClick={() => console.log("Cancelled logout")}>
                                        No
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
                <main>
                    <ul className="adminul">
                        <input type="text" placeholder="Search..." className="admintextbox" />
                        <Link to="/Employee" className="btn border-0 bg-transparent text-dark fs-5 fw-bold text-decoration-underline">
                            Employee
                        </Link>
                    </ul>
                    <div className="row fs-2 fw-bold text-decoration-underline mb-3 ms-4 text-light" id="heading1">
                        Users List
                    </div>
                    <div className="row ms-4" id="admindatacontainer" />
                    <div className="row ms-4" id="filterdatacontainer" />
                </main>
            </div>
            <div class="container-fluid mt-5 footer">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2 d-flex flex-column   mt-3">
                <div class="row text-decoration-underline ps-2">Quick Links</div>
                <div class="row"><a href="/" class="text-white text-decoration-none">Home</a></div>
                <div class="row"><a href="/features" class="text-white text-decoration-none">Features</a></div>
                <div class="row"><a href="/pricing" class="text-white text-decoration-none">Pricing</a></div>
                <div class="row"><a href="/support" class="text-white text-decoration-none">Support</a></div>
                
            </div>
            <div class="col-2 d-flex flex-column   mt-3">
                <div class="row text-decoration-underline ps-2">Resources</div>
                <div class="row"><a href="/docs" class="text-white text-decoration-none">Documentation</a></div>
                <div class="row"><a href="/api" class="text-white text-decoration-none">API Reference</a></div>
                <div class="row"><a href="/faqs" class="text-white text-decoration-none">FAQs</a></div>
                <div class="row"><a href="/guides" class="text-white text-decoration-none">User Guides</a></div>
            </div>
            <div class="col-2 d-flex flex-column  mt-3">
                <div class="row text-decoration-underline ps-2">Legal</div>
                <div class="row"><a href="/privacy" class="text-white text-decoration-none">Privacy Policy</a></div>
                <div class="row"><a href="/terms" class="text-white text-decoration-none">Terms of Service</a></div>
                <div class="row"><a href="/blog" class="text-white text-decoration-none">Blog</a></div>
            </div>
            <div class="col-2 d-flex flex-column   mt-3">
                <div class="row text-decoration-underline ps-2">Connect with Us</div>
                <div class="row"><a href="/contact" class="text-white text-decoration-none">Contact Us</a></div>
                <div class="row"><a href="" class="text-white text-decoration-none">1-800-123-4567</a></div>
                <div class="row"><a href="mailto:support@yourcompany.com" class="text-white text-decoration-none">support@yourcompany.com</a></div>
            </div>
            <div class="col-2"></div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col border border-secondary border-top"></div>
            <div class="col-2"></div>
        </div>
        <div class="row mt-3">
            <div class="col-2"></div>
            <div class="col">Copyright © [Year] [Your Company Name]. All rights reserved.</div>
            <div class="col-2"></div>
        </div>
    </div>
        </div>
    );
}
