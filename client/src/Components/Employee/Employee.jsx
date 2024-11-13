import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import axios from 'axios';


export default function Employee() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    console.log("id: ", id);
    const token = localStorage.getItem(id);
    console.log("Token:", token);

    const [data, setData] = useState(null);
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State for toggling password reset form
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Manage offcanvas state
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State for the logout confirmation modal
    const [isPageBlurred, setIsPageBlurred] = useState(false); 
    const navigate = useNavigate();

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        console.log("Reset password button clicked...", newpassword, password);
    
        // Check if both fields are filled before sending the request
        if (password && newpassword) {
            const dataToSubmit = { password, newpassword }; // Prepare the data object
    
            try {
                const response = await axios.put(`http://localhost:3000/passwordreset/${id}`, dataToSubmit, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                console.log("Employee Data after password reset: ", response.data);
    
                // Check if the server returned a success message
                if (response.status === 200) {
                    setData(response.data.data);
    
                    // Display success message from the server, if available
                    const successMessage = response.data.message || 'Password reset successful!';
                    alert(successMessage);
    
                    // Navigate to the home page after success
                    navigate(`/`);
                } else {
                    // If the response is not successful, display the error message from the server
                    alert(response.data.message || 'An error occurred. Please try again.');
                }
    
            } catch (error) {
                console.error("Error resetting password:", error);
    
                // Check if the error response is available and has a message
                if (error.response && error.response.data && error.response.data.message) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    // If no specific message is available, show a generic error message
                    alert("An error occurred while resetting your password. Please try again.");
                }
            }
        } else {
            alert("Both current and new passwords are required.");
        }
    };
    
    
    
    
    

    const handleLogout = () => {
        setShowLogoutConfirmation(true);
        setIsPageBlurred(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
        setIsPageBlurred(false);
    };

    const confirmLogout = () => {
        localStorage.removeItem(id);
        navigate('/');
    };

    // Toggle offcanvas visibility
    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const updatePage = () => {
        console.log("Update btn clicked");
        navigate(`/updateemployee/${id}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                console.log("Employee Data: ", response.data);
                setData(response.data.data); // Assuming response.data.data is the employee object
    
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

 const handleCancel = (event) => {
    event.preventDefault();  // Prevent form submission
    setIsEditing(false);  // Close the password reset form
    setPassword('');  // Clear current password input
    setNewPassword('');  // Clear new password input
};


    return (
        <div className="adduser">
            <div className="container-fluid p-0 m-0">
                <nav className="navbar d-flex justify-content-center">
                    <ul className="d-flex list-unstyled">
                        <li className="nav-item">
                            <button
                                className="border-0 bg-transparent fs-5 fw-bold Home"
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
                                    <h5 id="offcanvasRightLabel" className="fs-5 fw-bold text-Dark text-decoration-underline mt-3 ms-4">
                                        Your Profile
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        onClick={toggleOffcanvas}  // Close offcanvas
                                        aria-label="Close"
                                    />
                                </div>

                                <div><button onClick={updatePage} className="Editbtn">Edit profile  <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></div>

                                <div className="offcanvas-body d-flex flex-column">
                                <form className="resetformoffcanvas" onSubmit={handleProfileSubmit}>
    <button
        className="btn1"
        type="button"  // Change the type to "button" to prevent form submission
        onClick={() => setIsEditing(!isEditing)}
    >
                                        {isEditing ? "Cancel" : <>Reset Your Password <i className="fa fa-long-arrow-right" aria-hidden="true"></i></>}

    </button>

    {isEditing && (
        <div>
            <div className="mb-3 coolinput">
                <label htmlFor="resetpassword" className="coolinputlabeltext">Current Password:</label>
                <input
                    type="password"
                    name="password"
                    className="coolinputinput"
                    placeholder="Enter Current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 coolinput">
                <label htmlFor="newpassword" className="coolinputlabeltext">New Password:</label>
                <input
                    type="password"
                    name="newpassword"
                    className="coolinputinput"
                    placeholder="Enter New password"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="Btn mt-2">Submit</button>

            {/* Cancel button */}
            
        </div>
    )}
</form>


                                   <div className="logoutdiv"><button onClick={handleLogout} className="logoutbtn">Logout</button></div>
                                   {showLogoutConfirmation && (
          <div className="logout-modal">
            <div className="logout-modal-content">
              <h5>Are you sure you want to log out?</h5>
              <div className="modal-actions">
                <button className="btn" onClick={confirmLogout}>Yes</button>
                <button className="btn" onClick={cancelLogout}>No</button>
              </div>
            </div>
          </div>
        )}
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col employeebody">
                        <div className="row d-flex welcomediv">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-2" />
                                    <div className="col-10">
                                        <div className="col fs-4 fw-bold text-dark mt-5 mb-3">
                                            HR MANAGEMENT
                                        </div>
                                        <div className="col fs-1 fw-bold text-dark mb-2">
                                            Welcome To Our Team
                                        </div>
                                        <div className="col fs-5 text-dark mb-4 lh-lg">
                                            We’re thrilled to have you onboard! As a valued member of our
                                            organization, you play a crucial role in our mission. Together,
                                            we’ll achieve great things! We’re excited to embark on this
                                            journey with you. Let’s make great things happen together!
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="col text-center mt-5">
                                    <img src={`http://localhost:3000/${data[0].image}`} alt="Employee" className="singleusercontainerimg" />
                                </div>
                                <div className="col text-center text-dark mb-3 mt-3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Name: {data[0].name}
                                </div>
                                <div
                                    className="col fs-5 fw-bold text-center text-dark mb-3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Email: {data[0].email}
                                </div>
                                <div
                                    className="col fs-5 fw-bold text-center text-dark mb-3"
                                    style={{ fontSize: 18, fontWeight: 700 }}
                                >
                                    Join Date: {data[0].joiningDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 pb-2 footer1">
                <div className="row">
                    <div className="col-2" />
                    <div className="col-2 d-flex flex-column   mt-3">
                        <div className="row text-decoration-underline ps-2 text-dark">Quick Links</div>
                        <div className="row">
                            <a href="/" className="text-dark text-decoration-none">
                                Home
                            </a>
                        </div>
                        <div className="row">
                            <a href="/features" className="text-dark text-decoration-none">
                                Features
                            </a>
                        </div>
                        <div className="row">
                            <a href="/pricing" className="text-dark text-decoration-none">
                                Pricing
                            </a>
                        </div>
                        <div className="row">
                            <a href="/support" className="text-dark text-decoration-none">
                                Support
                            </a>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column   mt-3">
                        <div className="row text-decoration-underline ps-2 text-dark">Resources</div>
                        <div className="row">
                            <a href="/docs" className="text-dark text-decoration-none">
                                Documentation
                            </a>
                        </div>
                        <div className="row">
                            <a href="/api" className="text-dark text-decoration-none">
                                API Reference
                            </a>
                        </div>
                        <div className="row">
                            <a href="/faqs" className="text-dark text-decoration-none">
                                FAQs
                            </a>
                        </div>
                        <div className="row">
                            <a href="/guides" className="text-dark text-decoration-none">
                                User Guides
                            </a>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column  mt-3">
                        <div className="row text-decoration-underline ps-2 text-dark">Legal</div>
                        <div className="row">
                            <a href="/privacy" className="text-dark text-decoration-none">
                                Privacy Policy
                            </a>
                        </div>
                        <div className="row">
                            <a href="/terms" className="text-dark text-decoration-none">
                                Terms of Service
                            </a>
                        </div>
                        <div className="row">
                            <a href="/blog" className="text-dark text-decoration-none">
                                Blog
                            </a>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column   mt-3">
                        <div className="row text-decoration-underline ps-2 text-dark">Connect with Us</div>
                        <div className="row">
                            <a href="/contact" className="text-dark text-decoration-none">
                                Contact Us
                            </a>
                        </div>
                        <div className="row">
                            <a href="" className="text-dark text-decoration-none">
                                1-800-123-4567
                            </a>
                        </div>
                        <div className="row">
                            <a
                                href="mailto:support@yourcompany.com"
                                className="text-dark text-decoration-none"
                            >
                                support@yourcompany.com
                            </a>
                        </div>
                    </div>
                    <div className="col-2" />
                </div>
                <div className="row">
                    <div className="col-2" />
                    <div className="col border border-secondary border-top" />
                    <div className="col-2" />
                </div>
                <div className="row ">
                    <div className="col-2" />
                    <div className="col text-dark">
                        Copyright © [Year] [Your Company Name]. All rights reserved.
                    </div>
                    <div className="col-2" />
                </div>
            </div>
        </div>

    );
}
