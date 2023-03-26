import React from 'react';
import './Ngopage.css';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


const Profile = () => {
    const {user,logout} = useAuth0();
    const email = user.email
    const [name,setName] = useState('')
    const [locality,setLocality] = useState('')
    const [submitForm,setSubmitForm] = useState(false);
    let navigate = useNavigate();
    console.log(email,name,locality)
    async function submit(e){
        e.preventDefault();
        try{
            console.log(email,name,locality);
            await axios.post("http://localhost:3001/locality",{
                email,name,locality
            })
            .then(res =>{
                console.log(res);
                setSubmitForm(true);
                console.log(submitForm)
            }) 
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        
        <div>
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
            <form action="POST">
                <input type = "text" onChange={(e) => {setName(e.target.value)}} placeholder = "Name" name = "" id = "" />
                <input type = "text" onChange = {(e) => {setLocality(e.target.value)}} placeholder = "locality" name = "" id = ""/>
                <input type = "submit" onClick={submit}/>
                <p>{submitForm ? <p>Submitted</p> : <p></p>}</p>
            </form>
            </ul>
        </div>
    )
}

export default Profile;