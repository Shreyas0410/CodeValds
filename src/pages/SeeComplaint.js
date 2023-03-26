import React from 'react';
import './Ngopage.css';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './SeeComplain.css'

function SeeComplaint(){
    const navigate = useNavigate();
    const {logout,user} = useAuth0();
    const email = user.email
    const [locality,setLocality] = useState();
    const [complaints, setComplaints] = useState([]);
    const [clickedUpvote,setClickedUpvote] = useState(false);
    const [clickedDownvote,setClickedDownvote] = useState(false);
    useEffect(() => {
        try {
          axios
            .get("http://localhost:3001/allcomplaint",{
                params : {mail : email}
            })
            .then((res) => {
              setComplaints(res.data);
            });
        } catch (e) {
          console.log(e);
        }
      }, [email]);
      
      const changeVotes = (title,votes) => {
        console.log(title)
        console.log(votes)
            try{
                axios.post("http://localhost:3001/changevotes",{
                    title,votes
                }).then(res => {
                    console.log(res)
                    setComplaints(complaints => {
                        const updatedComplaints = complaints.map(complaint => {
                            if(complaint.title === title){
                                return {...complaint,Votes: complaint.Votes + votes}
                            }
                            return complaint
                        })
                        return updatedComplaints
                    })
                })
            }
            catch(e){
                console.log(e)
            }
      }
      const volunteer = (x,title) =>{
        console.log("User email id is"+user.email);
        console.log("Complaint email_id is"+x);
        if(user.email === x){
          alert("Cannot become a volunteer")
        }
        else{
          try{
            axios.post("http://localhost:3001/volunteer",{
              email,x,title
            }).then(res =>{
              console.log(res) 
              alert("Volunteered!")
            })
          }
          catch(e){
            console.log(e)
          }
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
        <h1>Complaint</h1>
        <ul>
        {complaints.map((complaint, index) => (
        <div key={index}>
        <h1>{complaint.title}</h1>
        <p>{complaint.description}</p>
        <p>{complaint.locality}</p>
        <p>{complaint.email_id}</p>
        <img src = {complaint.File} height = "300px" width= "300px" />
        <p>Volunteer</p>
        <p>{complaint.Volunteer}</p>
        <p>{complaint.Votes}</p>
        <br></br>
        <button id="b1" onClick = {() => {changeVotes(complaint.title,1);setClickedUpvote(true);setClickedDownvote(false)}} disabled={clickedUpvote}>Upvote</button> 
        <button id="b2" onClick = {() => {changeVotes(complaint.title,-1);setClickedDownvote(true);setClickedUpvote(false)}} disabled={clickedDownvote}>Downvote</button>
        <button id = "b3" onClick={() => {volunteer(complaint.email_id,complaint.title)}}>Become a volunteer?</button>
        </div>
        ))}
        </ul>
        </div>
      )
}

export default SeeComplaint;