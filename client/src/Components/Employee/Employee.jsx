import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JS

export default function Employee() {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    console.log("id : ", id);
    const token = localStorage.getItem(id);
    console.log("Token:", token);

    const [data, setData] = useState(null);
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Manage offcanvas state
    const navigate = useNavigate();

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        console.log("Reset password button clicked...", newpassword, password);

        const dataToSubmit = { password, newpassword }; // Prepare the data object

        try {
            const response = await fetch(`http://localhost:3000/passwordreset/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSubmit),
            });

            const result = await response.json();
            console.log("Employee Data after password reset: ", result);
            setData(result.data);

            if (response.ok) {
                navigate(`/`);
            }

        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(token);
        navigate(`/`);
    };

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const updatepage = () => {
        console.log("update btn clicked")
        navigate(`/updateemployee/${id}`)
    }

    // Fetch employee data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                console.log("Employee Data: ", result);
                setData(result.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) {
            fetchData();
        }

    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="adduser">
            <div className="container-fluid">
                <nav className="navbar d-flex justify-content-center">
                    <ul className="d-flex list-unstyled">
                        <li className="nav-item">
                            <button
                                className="btn"
                                type="button"
                                onClick={toggleOffcanvas}  // Toggle offcanvas visibility
                            >
                                Profile
                            </button>

                            {/* Offcanvas */}
                            <div
                                className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`}
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
                                        onClick={toggleOffcanvas}  // Close offcanvas
                                        aria-label="Close"
                                    />
                                </div>

                                <div><button onClick={updatepage}>Edit profile</button></div>

                                <div className="offcanvas-body d-flex flex-column">
                                    <form className="resetformoffcanvas" onSubmit={handleProfileSubmit}>
                                        <div className="mb-3 text-dark">
                                            <label htmlFor="password">Current Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter Current password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                                value={newpassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
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

                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col www">
                        <div className="row d-flex">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-2" />
                                    <div className="col-10">
                                        <div className="col fs-4 fw-bold text-light mt-5 mb-2">
                                            HR MANAGEMENT
                                        </div>
                                        <div className="col fs-1 fw-bold text-light">
                                            Welcome To Our Team
                                        </div>
                                        <div className="col fs-5 text-light mb-4">
                                            We’re thrilled to have you onboard! As a valued member of our
                                            organization, you play a crucial role in our mission. Together,
                                            we’ll achieve great things! We’re excited to embark on this
                                            journey with you. Let’s make great things happen together!
                                        </div>
                                        <div className="col">
                                            <button className="border-1 ps-2 pe-2 bg-transparent text-light morebtn">
                                                more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="col text-center mt-5">
                                    <img src={data.image} alt="Employee" className="singleusercontainerimg" />
                                </div>
                                <div className="col text-center text-light mb-3 mt-
3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Name: {data[0].name}
                                </div>
                                <div
                                    className="col fs-5 fw-bold text-center text-light mb-3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Email: {data[0].email}
                                </div>
                                <div
                                    className="col fs-5 fw-bold text-center text-light mb-3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Join Date: {data[0].joiningdate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



