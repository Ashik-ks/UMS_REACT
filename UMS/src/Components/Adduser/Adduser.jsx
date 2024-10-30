import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Adduser() {
    return (
        <>
            <div className="adduser">
                <div className="container-fluid">
                    <nav className="navbar d-flex justify-content-center">
                        <ul className="d-flex">
                            <li className="nav-item">
                                <Link to="/Admin" className="border-0 bg-transparent text-light fs-5">
                                    Admin
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-light text-decoration-none fs-5">
                                    Login Page
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="form-container1">
                    <h2>User Form</h2>
                    <form id="userForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control adduseremail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image">Image:</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="joiningdate">Joining Date:</label>
                            <input
                                type="text"
                                id="joiningdate"
                                name="joiningDate"
                                className="form-control"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userType">User Type:</label>
                            <select
                                id="userType"
                                name="userType"
                                className="form-control"
                                value={formData.userType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select user type</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>
                        <button type="submit" className="adduserbtn mt-2">
                            Submit
                        </button>
                    </form>
                </div>
                {/* Footer Section */}
                <div className="container-fluid mt-5 footer">
                    <div className="row">
                        {/* Footer Links */}
                        {/* ... (same footer content) */}
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            Copyright © [Year] [Your Company Name]. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
