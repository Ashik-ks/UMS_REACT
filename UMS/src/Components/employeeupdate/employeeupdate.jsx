import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Employeeupdate() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // You can handle form submission logic here, e.g., send data to an API
        console.log("Form submitted:", Object.fromEntries(formData.entries()));
    };

    return (
        <div className="adduser">
            <nav className="navbar d-flex justify-content-center bg-dark">
                <ul className="d-flex">
                    <Link to="/Admin" className="nav-link text-light text-decoration-none fs-4">
                        Admin
                    </Link>
                    <a className="nav-link text-light text-decoration-none fs-4" href="./index.html">
                        Login Page
                    </a>
                </ul>
            </nav>
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="joiningdate">Joining Date:</label>
                        <input
                            type="text"
                            id="joiningdate"
                            name="joiningdate"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userType">User Type:</label>
                        <select
                            id="userType"
                            name="userType"
                            className="form-control"
                            required
                        >
                            <option value="Employee">Employee</option>
                        </select>
                    </div>
                    <button type="submit" className="employeeupdatebtn mt-2">
                        Submit
                    </button>
                </form>
            </div>
            {/* Add footer or other components as necessary */}
        </div>
    );
}

