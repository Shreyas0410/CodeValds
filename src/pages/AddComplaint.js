import React, { useState } from 'react';
import './AddComplaint.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function AddComplaint() {
  const navigate = useNavigate();
  const { logout, user } = useAuth0();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locality, setLocality] = useState('');
  const [file, setFile] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [done,setDone] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('locality', locality);
    formData.append('file', file);
    formData.append('email', user.email);

    try {
      await axios.post('http://localhost:3001/complaint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("INSERTED");
      setDone(true)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <body>
      <nav>
        <ul>
          <button onClick = {() => navigate("/LoggedIn")}>Home</button>
          <button>Complaint</button>
          <button onClick = {() => navigate("/MyComplaint")}>My Complaint</button>
          <button>Volunteer</button>
          <button>About Us</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick = {() =>logout({ logoutParams: { returnTo: window.location.origin } }) }>Logout</button>
        </ul>
      </nav>
      
      <ul>
        {complaints.map((complaint, index) => (
          <div key={index}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>{complaint.locality}</p>
            <p>{complaint.email_id}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
        <h1>Add Complaint</h1>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            name=""
            id="input-title"
          />
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell about your complaint"
            name=""
            id="input-text1"
          />
          <input
            type="text"
            onChange={(e) => setLocality(e.target.value)}
            placeholder="locality"
            name=""
            id="input-text2"
          />
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input type="submit" value="Submit" id = "input-submit" />
          <p>{done ? <p>Added Complaint</p> : <p></p>}</p>
        </form>
      </ul>
    </body>
  );
}

export default AddComplaint;
