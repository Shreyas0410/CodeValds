import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import img from './assests/Default.jpg'
import './MyComplaint.css';

const MyComplaint = () => {
  const { user,logout } = useAuth0();
  const email = user.email;
  const [complaints, setComplaints] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/mycomplaint", {
          params: { mail: email },
        })
        .then((res) => {
          setComplaints(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, [email]);
  const dell = (title) => {
    try{
        console.log("IDHAR SE JAA RAHA H")
        axios.post("http://localhost:3001/delete",{
            params : {mail : email , heading : title}
        })
        .then((res) =>{
            setComplaints(res.data);
        });
    }
    catch(e){
        console.log(e);
    }
}
  console.log(complaints)
  return (
    <div>
        <nav>
        <ul>
          <button onClick={() => navigate("/LoggedIn")}>Home</button>
          <button>Complaint</button>
          <button onClick = {() => navigate("/MyComplaint")}>My Complaint</button>
          <button>Volunteer</button>
          <button>About Us</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick = {() =>logout({ logoutParams: { returnTo: window.location.origin } }) }>Logout</button>
        </ul>
      </nav>
        <p id="tit">My Complaints</p>
        <div className="info">
      {complaints.map((complaint, index) => (
        <div key={index}>
          <p id="comp-title">{complaint.title}</p>
          <p id="comp-desc">{complaint.description}</p>
          <p id="comp-local">{complaint.locality}<span>🌍</span></p>
          <img id="comp-img" src = {complaint.File} />
         <div id="random"> <p id="comp-votes">{complaint.Votes}</p>
          <button id="rando"  onClick = {() => dell(complaint.title)}>Delete</button></div>
        </div>
        
      ))}
      </div>
    </div>
  );
};

export default MyComplaint;
