import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Adduser() {
    return(
        <>
        <div className="adduser">
        <div className="container-fluid ">
        <nav className="navbar d-flex justify-content-center">
          <ul className="d-flex">
            {/* <li class="nav-item"> */}
            <button
              onclick="passtoken2()"
              className="border-0 bg-transparent text-light fs-5"
            >
               <Link to="/Admin" className="admin-link">
                                Admin
                            </Link>
            </button>
            {/* </li> */}
            {/* <li class="nav-item"> */}
            <a
              className="nav-link text-light text-decoration-none fs-5"
              href="./index.html"
            >
              Login Page
            </a>
            {/* </li> */}
          </ul>
        </nav>
      </div>
      <div className="form-container1">
        <h2>User Form</h2>
        <form id="userForm" onsubmit="AddUser(event)">
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control adduseremail"
              required=""
            />
          </div>
          {/* <div class="mb-3">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" class="form-control" required>
          </div> */}
          <div className="mb-3">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="joiningdate">Joining Date:</label>
            <input
              type="text"
              id="joiningdate"
              name="joiningdate"
              className="form-control"
              required=""
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              name="userType"
              className="form-control"
              required=""
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
      <div className="container-fluid mt-5 footer">
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
            <div className="row text-decoration-underline ps-2">
              Connect with Us
            </div>
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
    </>
    )
}