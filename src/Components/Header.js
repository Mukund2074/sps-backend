import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import checkSession from "../auth/authService";
import { toast } from "react-toastify";
import axios from "axios";

function Header() {
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [isCardAssigned, setIsCardAssigned] = useState(false);
    const [activeItem, setActiveItem] = useState("Home");

    const navigate = useNavigate();

    const handleSearch = () => {
        // Navigate to the page based on the search term
        if (search.trim() !== "") {
            // For simplicity, let's assume each page has a unique path
            navigate(`/${search}`);
        }
    };


    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
    });

    const switchTheme = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            setIsLoading(true);
            const chechAuth = await checkSession();
            const loggedIn = chechAuth.isAuth;
            if (loggedIn) {
                setIsCardAssigned(chechAuth.isCard);
            }
            setIsLoggedIn(loggedIn);
            setIsLoading(false);
        };

        checkLoginStatus();

        switch (location.pathname) {
            case "/":
                setActiveItem("Home");
                break;
            case "/bookonline":
                setActiveItem("Book Online");
                break;
            case "/about":
                setActiveItem("About");
                break;
            case "/services":
                setActiveItem("Services");
                break;
            case "/applyForCard":
                setActiveItem("Apply Card");
                break;
            case "/viewCard":
                setActiveItem("View Card");
                break;
            case "/bookings":
                setActiveItem("Booking");
                break;
            case "/giveFeedback":
                setActiveItem("Feedback");
                break;
            case "/addComplaint":
                setActiveItem("Complaint");
                break;
            default:
                setActiveItem("Home");
                break;
        }
    }, [location.pathname]);

    const handleLogout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("http://localhost:8000/user/userlogout");
            toast.success("Logout Successful", {
                autoClose: 1000,
                onClose: () => window.location.reload(),
                position: "top-left",
            });
        } catch (error) {
            console.log("Logout Err: ", error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
                onClose: () => window.location.reload(),
                position: "top-left",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <>
            <header id="site-header" className="fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <h1>
                            <Link className="navbar-brand" to="/">
                                <span>D</span>rive<span>S</span>ync<span>P</span>ark<span>X</span>
                            </Link>
                        </h1>
                        <button
                            className="navbar-toggler collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="fa icon-expand fa-bars" />
                            <span className="fa icon-close fa-times" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mr-2">
                                <li className={`nav-item ${activeItem === "Home" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/" style={{ fontSize: "15px" }}>
                                        Home
                                    </Link>
                                </li>
                                {isLoggedIn && (
                                    <li className={`nav-item ${activeItem === "Book Online" ? "active" : ""}`}>
                                        <Link className="nav-link" to="/bookonline" style={{ fontSize: "15px" }}>
                                            Book Online
                                        </Link>
                                    </li>
                                )}
                                <li className={`nav-item ${activeItem === "About" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/about" style={{ fontSize: "15px" }}>
                                        About
                                    </Link>
                                </li>
                                <li className={`nav-item ${activeItem === "Services" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/services" style={{ fontSize: "15px" }}>
                                        Services
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        style={{ fontSize: "15px" }}
                                    >
                                        More<i className="fa fa-angle-down"/>
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {isLoggedIn && isCardAssigned && (
                                            <Link className="dropdown-item" to="/viewCard">
                                                View Card
                                            </Link>
                                        )}
                                        {isLoggedIn && !isCardAssigned && (
                                            <Link className="dropdown-item" to="/applyForCard">
                                                Apply for Card
                                            </Link>
                                        )}
                                        {isLoggedIn && (
                                            <>
                                                <Link className="dropdown-item" to="/bookings">
                                                    Booking
                                                </Link>
                                                <Link className="dropdown-item" to="/addComplaint">
                                                    Add Complaint
                                                </Link>
                                            </>
                                        )}
                                        <Link className="dropdown-item" to="/giveFeedback">
                                            Feedback
                                        </Link>
                                       
                                    </div>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto mt-lg-0 mt-2">
                                <li className="nav-item mt-2">

                                    <div className="search-bar  row ">
                                        <input
                                            className="form-control bg-transparent col-8"
                                            type="text"
                                            placeholder="Search..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button
                                            className="btn btn-primary ml-2 col-3  "
                                            onClick={handleSearch}><i className="fa fa-search" /></button>
                                    </div>
                                </li>
                                {isLoggedIn ? (
                                    <li className="nav-item mt-2">
                                        <Link
                                            onClick={(e) => handleLogout(e)}
                                            className="btn btn-primary d-lg-block btn-style mr-2"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link
                                            to="/login"
                                            className="btn btn-primary d-lg-block btn-style mr-2"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                )}


                            </ul>
                        </div>
                        <div className="mobile-position">
                            <nav className="navigation">
                                <div className="theme-switch-wrapper">
                                    <label className="theme-switch" htmlFor="checkbox">
                                        <input
                                            type="checkbox"
                                            id="checkbox"
                                            checked={theme === "dark"}
                                            onChange={switchTheme}
                                        />
                                        <div className="mode-container">
                                            <i className="gg-sun" />
                                            <i className="gg-moon" />
                                        </div>
                                    </label>
                                </div>
                            </nav>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
