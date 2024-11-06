import React from "react";
import { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Singleview(){


    return(
        <>
  <div className="adduser">
  <div className="container-fluid bg-dark">
    <nav className="navbar d-flex justify-content-center">
      <ul className="mt-1">
        <button
          
          className="border-0 bg-transparent text-light fs-5 fw-bold"
        >admin
          {/* <Link to={`/Admin?id=${id}&login=${tokenData}`} className="adduser-link">Admin</Link> */}
        </button>
       
      </ul>
    </nav>
  </div>
  <div className="container mt-5">
    <div className="row">
      <div className="col-3" />
      <div className="col-6 fs-2 fw-bold text-decoration-underline">
        Profile Details
      </div>
      <div className="col-3" />
    </div>
  </div>
  <div id="singleusercontainer" className="mt-3"></div>
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