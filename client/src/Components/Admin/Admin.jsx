import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log("id : ", id)
  const tokenData = queryParams.get('login');
  console.log("tokendata : ", tokenData)

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

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

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    console.log("Reset password button clicked...", newpassword, password);

    const dataToSubmit = { password, newpassword }; // Prepare the data object

    try {
      const token = localStorage.getItem(tokenData);
      if (!token) {
        console.error("Token is missing, please log in again.");
        return;
      }

      const response = await fetch(`http://localhost:3000/passwordreset/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      console.log("Employee Data after password reset:", result);

      if (response.ok) {
        navigate(`/`);  // Redirect to login page after reset
      } else {
        // Handle unsuccessful response
        alert("Password reset failed. Please try again.");
      }

    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting the password.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem(tokenData);
    console.log("Logged out");
    navigate('/');
  };

  const singleview = (_id) => {
    console.log("singleview button clicked with ID:", _id);
    navigate(`/singleview/${_id}/${tokenData}`);
  };

  const deleteUser = async (userId) => {

    const token = localStorage.getItem( tokenData);
        console.log("Token:", token);

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("User deleted successfully");
        navigate(0);
      } 
    } catch (error) {
      console.error("Error deleting user:", error);
    } 
  };

  return (
    <div className="adduser1">
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
            <Link to="/Employee" className="btn border-0 bg-transparent text-light fs-5 fw-bold text-decoration-underline">Employee</Link>
          </ul>
          <div className="row fs-2 fw-bold text-decoration-underline mb-3 ms-4 text-light" id="heading1">Users List</div>
          <div className="userlist">
            {loading ? (
              <p>Loading...</p>
            ) : users.length > 0 ? (
              users.map(user => (
                <div className="row ms-4" key={user._id} >
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
                    <button className="btn1" onClick={() => singleview(user._id)} >View</button>
                  </div>
                  <div className="col">
                    <button className="btn1" onClick={() => deleteUser(user._id)} >delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </main>
      </div>
      <div className="container-fluid mt-5 footer1">
        <div className="row">
          <div className="col-2" />
          <div className="col-2 d-flex flex-column   mt-3">
            <div className="row text-decoration-underline ps-2">Quick Links</div>
            <div className="row">
              <a href="/" className="text-white text-decoration-none">
                Home
              </a>
            </div>
            <div className="row">
              <a href="/features" className="text-white text-decoration-none">
                Features
              </a>
            </div>
            <div className="row">
              <a href="/pricing" className="text-white text-decoration-none">
                Pricing
              </a>
            </div>
            <div className="row">
              <a href="/support" className="text-white text-decoration-none">
                Support
              </a>
            </div>
          </div>
          <div className="col-2 d-flex flex-column   mt-3">
            <div className="row text-decoration-underline ps-2">Resources</div>
            <div className="row">
              <a href="/docs" className="text-white text-decoration-none">
                Documentation
              </a>
            </div>
            <div className="row">
              <a href="/api" className="text-white text-decoration-none">
                API Reference
              </a>
            </div>
            <div className="row">
              <a href="/faqs" className="text-white text-decoration-none">
                FAQs
              </a>
            </div>
            <div className="row">
              <a href="/guides" className="text-white text-decoration-none">
                User Guides
              </a>
            </div>
          </div>
          <div className="col-2 d-flex flex-column  mt-3">
            <div className="row text-decoration-underline ps-2">Legal</div>
            <div className="row">
              <a href="/privacy" className="text-white text-decoration-none">
                Privacy Policy
              </a>
            </div>
            <div className="row">
              <a href="/terms" className="text-white text-decoration-none">
                Terms of Service
              </a>
            </div>
            <div className="row">
              <a href="/blog" className="text-white text-decoration-none">
                Blog
              </a>
            </div>
          </div>
          <div className="col-2 d-flex flex-column   mt-3">
            <div className="row text-decoration-underline ps-2">Connect with Us</div>
            <div className="row">
              <a href="/contact" className="text-white text-decoration-none">
                Contact Us
              </a>
            </div>
            <div className="row">
              <a href="" className="text-white text-decoration-none">
                1-800-123-4567
              </a>
            </div>
            <div className="row">
              <a
                href="mailto:support@yourcompany.com"
                className="text-white text-decoration-none"
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
        <div className="row mt-3">
          <div className="col-2" />
          <div className="col">
            Copyright © [Year] [Your Company Name]. All rights reserved.
          </div>
          <div className="col-2" />
        </div>
      </div>
    </div>
  );
}
