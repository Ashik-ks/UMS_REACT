import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem(id);
  console.log("token : ", token);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(''); // To store the base64 image

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
        if (result.data) {
          const { name, email, joiningDate, image } = result.data[0];
          setName(name);
          setEmail(email);
          setJoiningDate(joiningDate);
          setImage(image); // Assuming image is a URL or base64 string
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  // Handle image conversion to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Save the file object for potential use

    // Convert the image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // Store the base64 string
    };
    if (file) {
      reader.readAsDataURL(file); // This triggers the conversion to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the body with name, email, and the Base64 image
    const body = {
      name,
      email,
      joiningDate,
      image: imageBase64, // Sending the base64 image string
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Sending JSON data
        },
        body: JSON.stringify(body), // Send the JSON body with the base64 image
      });

      if (response.ok) {
        alert("User updated successfully");
        navigate(`/employee?id=${id}`);
      } else {
        alert("User update failed");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("An error occurred while updating the employee.");
    }
  };

  return (
    <div className="adduser">
      <nav className="navbar d-flex justify-content-center bg-dark">
        <ul className="d-flex">
          <li className="nav-item list-unstyled">
            <button
              onClick={() => navigate('/employee')}
              className="border-0 bg-transparent text-light fs-4 nav-link"
            >
              Home Page
            </button>
          </li>
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
              className="form-control"
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
              onChange={handleImageChange} // Handle image change
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
            />
          </div>

          <button type="submit" className="employeeupdatebtn mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
