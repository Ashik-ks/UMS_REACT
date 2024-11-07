import React, { useState, useEffect } from "react";
import { Navigate, useParams,useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Singleview() {
  const { id } = useParams();  
  console.log("Received ID: ", id);  

  const { login } = useParams();

  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State to handle errors

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log("API Response:", result);  // Log the entire response

        if (!result || !result.data) {
          throw new Error("Data not found");
        }

        let data = result.data;  // Get the data from the response
        console.log("Fetched Data: ", data);

        setData(data);  // Set data to state

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);  // Set error state
      } finally {
        setLoading(false);  // End loading
      }
    };

    fetchData();  // Fetch data when component mounts or when the 'id' changes
  }, [id]);

  const passtoken = () => {
    console.log("passtoken button clicked with ID:");
    navigate(`/Admin?id=${id}&login=${login}`);
  }

  // Handle loading, error, and successful data fetch
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // If no data is found
  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div className="adduser">
        <div className="container-fluid bg-dark">
          <nav className="navbar d-flex justify-content-center">
            <ul className="mt-1">
              <button className="border-0 bg-transparent text-light fs-5 fw-bold" onClick={passtoken}>admin</button>
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

        <div className="container">
          <div className="row">
            <div className="col-3" />
            <div
              className="col-6 shadow-sm p-3 mb-5 bg-body rounded"
              style={{
                backgroundImage: 'url("./images/WhatsApp Image 2024-10-09 at 12.32.24_0a5cc346.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="row d-flex flex-column justify-content-center align-items-center">
                <div className="col text-center mt-3">
                  {/* Correct image path */}
                  <img src={`http://localhost:3000${data[0].image}`} className="singleusercontainerimg" alt="User" />
                </div>

                <div className="col  mb-4 mt-3 fs-4 fw-bold">
                  Name: {data[0].name
                  }
                </div>

                <div className="col fs-4 fw-bold  mb-4">
                  Email: {data[0].email}
                </div>

                <div className="col fs-4 fw-bold  mb-5">
                  Join Date: {data[0].joiningdate}
                </div>
              </div>
            </div>
            <div className="col-3" />
          </div>
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
    </>
  );
}
