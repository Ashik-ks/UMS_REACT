import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const tokenData = queryParams.get('login');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem(tokenData);
                console.log("Token:", token);
                const response = await fetch('http://localhost:3000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log("API Response:", data);
                setUsers(data.data || []); // Correctly access the user data
                console.log("Updated Users:", data.data); // Log the users
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchUsers();
    }, [tokenData]);

    const handleFilter = (value) => {
        console.log(`Filtering by: ${value}`);
    };

    const handlePasswordReset = (event) => {
        event.preventDefault();
        console.log("Password reset submitted");
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the authToken
        console.log("Logged out");
        navigate('/login'); // Navigate to the login page
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
                            <button id="fetchvalue1" onClick={() => handleFilter('')}>Users</button>
                        </li>
                        <li>
                            <Link to={`/Adduser?id=${id}&login=${tokenData}`} className="adduser-link">Add Users</Link>
                        </li>
                        <li>
                            <button id="fetchvalue3" onClick={() => handleFilter('Employee')}>Employee</button>
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
                                    <h5 id="offcanvasRightLabel" className="fs-5 fw-bold text-dark text-decoration-underline mt-3 ms-4">Profile Settings</h5>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                                </div>
                                <div className="offcanvas-body">
                                    <form onSubmit={handlePasswordReset}>
                                        <div className="mb-3 text-dark">
                                            <label htmlFor="resetpassword">Current Password:</label>
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
                                        <button type="submit" className="editbtn1 mt-2">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="logout-link border-0 text-light">Logout</button>
                        </li>
                    </ul>
                </nav>
                <main>
                    <ul className="adminul">
                        <input type="text" placeholder="Search..." className="admintextbox" />
                        <Link to="/Employee" className="btn border-0 bg-transparent text-dark fs-5 fw-bold text-decoration-underline">Employee</Link>
                    </ul>
                    <div className="row fs-2 fw-bold text-decoration-underline mb-3 ms-4 text-light" id="heading1">Users List</div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <div className="row ms-4" key={user.id}>
                                <div className="col">
                                    {user.image && (
                                        <img
                                            src={`http://localhost:3000${user.image}`}
                                            alt={user.name}
                                            className="img-fluid"
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    )}
                                </div>
                                <div className="col">{user.name}</div>
                                <div className="col">{user.email}</div>
                                <div className="col">
                                    <button onClick={() => console.log(`Edit user ${user.id}`)}>Edit</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </main>

            </div>
            <footer className="container-fluid mt-5 footer">
                <div className="row">
                    <div className="col text-center">Copyright © [Year] [Your Company Name]. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
