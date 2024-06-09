import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useEffect, useState } from "react";
import checkSession from "./auth/authService";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Apply from "./Pages/Apply";
import 'react-toastify/dist/ReactToastify.css';
import GiveFeedback from "./Pages/GiveFeedback";
import AddComplaint from "./Pages/addComplaint";
import RechargeCard from "./Pages/RechargeCard";
import Payment from "./Pages/Payment";
import Bookonline from "./Pages/Bookonline";
import GetOnlineBooking from "./Pages/GetonlineBookings";

function App() {

  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true); // New loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const checkAuth = await checkSession();
        // console.log(checkAuth);
        if (checkAuth.isAuth) {
          setIsAuthenticated(true);
        }

      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
      // console.log("isAuthenticated", isAuthenticated);
    };
    if (!isAuthenticated) {
      authenticateUser(); // Check session only if user is not authenticated
    } else {
      setLoading(false); // Set loading to false immediately if user is authenticated
    }

  }, [isAuthenticated]);
  if (loading) {

    return null

  }
  return (
    <>
      <ToastContainer stacked />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? < Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? < Register /> : <Navigate to="/" />} />
          <Route path="/applyForCard" element={isAuthenticated ? < Apply /> : <Navigate to="/" />} />         
          <Route path="/bookings" element={isAuthenticated ? < GetOnlineBooking /> : <Navigate to="/" />} />
          <Route path="/addComplaint" element={isAuthenticated ? < AddComplaint /> : <Navigate to="/" />} />
          <Route path="/recharge" element={isAuthenticated ? < RechargeCard /> : <Navigate to="/" />} />
          <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to='/' />} />
          <Route path="/bookonline" element={isAuthenticated ? < Bookonline /> : <Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />         
          <Route path="/giveFeedback" element={<GiveFeedback />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
