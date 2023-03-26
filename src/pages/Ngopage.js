import React from 'react';
import './Ngopage.css';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function Ngopage() {
  const navigate = useNavigate();
  const {logout,user} = useAuth0();
    const email = user.email
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [locality,setLocality] = useState('')
    const [complaints, setComplaints] = useState([]);
    console.log(email,title,description,locality)
    async function submit(e){
        e.preventDefault();
        try{
            console.log(email,title,description,locality);
            await axios.post("http://localhost:3001/update",{
                email,title,description,locality
            })
            .then(res =>{
                console.log(res);
            }) 
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
      try {
        axios
          .get("http://localhost:3001/allcomplaint")
          .then((res) => {
            setComplaints(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }, [email]);
  return (
      <div>
      <nav>
        <ul>
          <button>Home</button>
          <button>Complaint</button>
          <button onClick = {() => navigate("/MyComplaint")}>My Complaint</button>
          <button>Volunteer</button>
          <button>About Us</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick = {() =>logout({ logoutParams: { returnTo: window.location.origin } }) }>Logout</button>
        </ul>
      </nav>
      <header>
        <button onClick = {() => {navigate("/AddComplaint")}}>Add Complaint</button>
        <button onClick = {() => {navigate("/SeeComplaint")}}>See Complaints</button>
      </header>
      <main>
        <div className='smallbox'>
          <p >300+ complaints Received</p>
          <p >120+ complaints Solved</p>
          <p >50+ Localities Covered</p>
        </div>
        <section>
          <h2>Programs</h2>
          <p>Details about the programs and intiatives of govt.</p>
        </section>
        <section>
          <h2>Volunteer</h2>
          <p>Ways for people to get involved with volunteering/helping work.</p>
        </section>
        <section>
          <h2>About Us</h2>
          <p>information.</p>
        </section>
      </main>
      <footer>
        <p>&copy;  FixIt 2023</p>
      </footer>
    </div>
);}
  

export default Ngopage;
