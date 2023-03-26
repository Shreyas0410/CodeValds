import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Ngopage from "./pages/Ngopage";
import { useEffect } from "react";
import { ReactDOM } from "react";
import Volunteer from "./pages/Volunteer";
import Profile from "./pages/profile";
import MyComplaint from "./pages/MyComplaint";
import AddComplaint from "./pages/AddComplaint";
import SeeComplaint from "./pages/SeeComplaint";

const App = () => {return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/LoggedIn" element={<Ngopage />} />
      <Route path = "/Profile" element = {< Profile />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path = "/MyComplaint" element = { <MyComplaint />} />
      <Route path = "/AddComplaint" element = { <AddComplaint />} />
      <Route path = "/SeeComplaint" element = { <SeeComplaint />} />
    </Routes>
  );
}
export default App;
