import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Employee() {
    const handleProfileSubmit = (event) => {
        event.preventDefault();
        // Your profile submission logic
        console.log("Profile updated");
    };

    const handleLogout = () => {
        // Your logout logic here
        console.log("Logged out");
    };

    return (
        <div className="adduser">
            <div className="container-fluid">
                <nav className="navbar d-flex justify-content-center">
                    <ul className="d-flex list-unstyled">
                        <li className="nav-item">
                            <button
                                className="btn"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                            >
                                <img
                                    src="./images/icons8-female-profile-50.png"
                                    alt="User Profile"
                                    className="profileimg"
                                />
                            </button>
                            <div
                                className="offcanvas offcanvas-end"
                                tabIndex={-1}
                                id="offcanvasRight"
                                aria-labelledby="offcanvasRightLabel"
                            >
                                <div className="offcanvas-header">
                                    <h5 id="offcanvasRightLabel" className="fs-5 fw-bold text-white text-decoration-underline mt-3 ms-4">
                                        Your Profile
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="offcanvas-body">
                                    <form onSubmit={handleProfileSubmit}>
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
                                    <button onClick={handleLogout} className="logout-link1 ms-4 mt-1 mb-3 fs-6 fw-bold">
                                        Logout
                                    </button>
                                    <div id="logoutdiv">
                                        <div className="text-danger ms-4 fs-6">Are you sure you want to logout?</div>
                                        <div className="d-flex gap-3 ms-4">
                                            <span className="text-danger spanbody" onClick={handleLogout}>
                                                Yes
                                            </span>
                                            <span className="text-danger spanbody" onClick={() => console.log("Cancelled logout")}>
                                                No
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="employeedatacontainer" className="mt-5" />
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
