import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setMessage('Please select a valid image file (JPEG, PNG, GIF).');
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setMessage('File size should be less than 2MB.');
                return;
            }
            setImage(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            setMessage('Please select an image file.');
            return;
        }

        try {
            const dataUrl = await readFileAsDataURL(image);
            await submitData(dataUrl);
        } catch (error) {
            console.error("Error reading files: ", error);
            setMessage('Failed to read the file.');
        }
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const submitData = async (dataUrl) => {
        const tokenkey = new URLSearchParams(window.location.search).get('login');
        const id = new URLSearchParams(window.location.search).get('id');
        const token = localStorage.getItem(tokenkey);
        
        if (!token) {
            setMessage('Authorization token not found.');
            return;
        }

        const add_data = {
            name,
            email,
            userType,
            joiningDate,
            image: dataUrl,
        };

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(add_data),
            });

            const responseText = await response.text();

            if (response.ok) {
                alert("User added successfully!");
                // Clear form after submission
                setName('');
                setEmail('');
                setUserType('');
                setJoiningDate('');
                setImage(null);
                document.getElementById('image').value = ''; // Reset the file input
                setTimeout(() => {
                    navigate(`/Admin?id=${id}&login=${tokenkey}`);
                }, 2000); // Optional delay before navigation
            } else {
                let errorResponse;

                try {
                    errorResponse = JSON.parse(responseText);
                } catch (e) {
                    console.error("Error parsing response:", e);
                    errorResponse = { message: "An error occurred. Please try again." };
                }

                setMessage(errorResponse.message || "User not added");
            }
        } catch (error) {
            console.error("Error submitting data: ", error);
            setMessage("An error occurred while adding the user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adduser">
            <div className="container-fluid">
                <nav className="navbar d-flex justify-content-center">
                    <ul className="d-flex">
                        <li className="nav-item">
                            <Link to="/Admin" className="admin-link border-0 bg-transparent text-light fs-5">
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            type="date"
                            id="joiningdate"
                            name="joiningdate"
                            className="form-control"
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userType">User Type:</label>
                        <select
                            id="userType"
                            name="userType"
                            className="form-control"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                        >
                            <option value="">Select user type</option>
                            <option value="Employee">Employee</option>
                            {/* More options can be added here */}
                        </select>
                    </div>
                    <button type="submit" className="adduserbtn mt-2" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                {message && <p className={`text-${loading ? 'success' : 'danger'}`}>{message}</p>}
            </div>
            <footer className="container-fluid mt-5 footer">
                <div className="row">
                    <div className="col-2" />
                    <div className="col-2 d-flex flex-column mt-3">
                        <div className="row text-decoration-underline ps-2">Quick Links</div>
                        <div className="row">
                            <Link to="/" className="text-white text-decoration-none">Home</Link>
                        </div>
                        <div className="row">
                            <Link to="/features" className="text-white text-decoration-none">Features</Link>
                        </div>
                        <div className="row">
                            <Link to="/pricing" className="text-white text-decoration-none">Pricing</Link>
                        </div>
                        <div className="row">
                            <Link to="/support" className="text-white text-decoration-none">Support</Link>
                        </div>
                    </div>
                    <div className="col-2" />
                </div>
                <div className="row mt-3">
                    <div className="col-2" />
                    <div className="col text-center">
                        Copyright © [Year] [Your Company Name]. All rights reserved.
                    </div>
                    <div className="col-2" />
                </div>
            </footer>
        </div>
    );
}

export default AddUser;
