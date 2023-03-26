import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import {useAuth0} from '@auth0/auth0-react'


const HomePage = () => {
  const navigate = useNavigate();
  const {loginWithRedirect,isAuthenticated} = useAuth0();

  return (
    <div className="home-page">
      <div className="home-page-child" />
      <div className="hero">
        {isAuthenticated ? (navigate("/LoggedIn")) : console.log("NOT")}
        <div className="top-nav">
         
         
          <button className="nav-item4" id="login-btn"  onClick={() => {loginWithRedirect()}}>Login</button>
         
        </div>
        <div className="hero-content">
          <div className="desc">
            <div className="cta" >
              
{/*                 
                <button className="discover-more">Discover more</button> */}
              
            </div>
            <b className="tagline">{`Top Complaint listing `}</b>
            <div className="desc1">
            Our mission is to provide a space where individuals can share their experiences, express their frustrations, and seek resolutions to their problems.
            </div>
          </div>
        </div>
      </div>
      
      
      <b className="heading">
        <p className="welcome-to">Welcome to</p>
        <p className="the-ngo-hub">the Complaint Hub</p>
      </b>
      <div className="parent">
        <div className="div">+</div>
        <div className="div1">+</div>
        <div className="div2">+</div>
        <div className="div3">+</div>
        <div className="div4">+</div>
        <div className="div5">+</div>
        <div className="div6">+</div>
        <div className="div7">+</div>
        <div className="div8">+</div>
        <div className="div9">+</div>
        <div className="div10">+</div>
        <div className="div11">+</div>
        <div className="div12">+</div>
        <div className="div13">+</div>
        <div className="div14">+</div>
        <div className="div15">+</div>
        <div className="div16">+</div>
        <div className="div17">+</div>
        <div className="div18">+</div>
        <div className="div19">+</div>
        <div className="div20">+</div>
        <div className="div21">+</div>
      </div>
     
      <div className="logo">Fix It!</div>
    </div>
  );
};

export default HomePage;
