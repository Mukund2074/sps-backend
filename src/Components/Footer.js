import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="w3l-footer-66">
            <section className="footer-inner-main">
                <div className="footer-hny-grids py-5">
                    <div className="container py-lg-4">
                        <div className="right-side">
                            <div className="row sub-columns">
                                <div className="col-lg-4 col-md-6 sub-one-left pr-lg-4">
                                    <h2>
                                        <Link className="navbar-brand" to="/">
                                        <span>D</span>rive<span>S</span>ync<span>P</span>ark<span>X</span>
                                        </Link>
                                    </h2>
                                    {/* if logo is image enable this   
                            <Link class="navbar-brand" href="#/">
                                <img src="image-path" alt="Your logo" title="Your logo" style="height:35px;" />
                            </Link> */}
                                    <p className="pr-lg-4">
                                        DriveSyncParkX is an online parking management system.
                                        It helps the users to book online parking slot via DriveSyncParkX.
                                        we provide RFID card for immediately booking.
                                        IOT device used for more security and eficciency.
                                    </p>
                                    <div className="columns-2">
                                        <ul className="social">
                                            <li>
                                                <Link to="#facebook">
                                                    <span
                                                        className="fa fa-facebook"
                                                        aria-hidden="true"
                                                    />{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#linkedin">
                                                    <span
                                                        className="fa fa-linkedin"
                                                        aria-hidden="true"
                                                    />{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#twitter">
                                                    <span
                                                        className="fa fa-twitter"
                                                        aria-hidden="true"
                                                    />{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#google">
                                                    <span
                                                        className="fa fa-google-plus"
                                                        aria-hidden="true"
                                                    />{" "}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#github">
                                                    <span className="fa fa-github" aria-hidden="true" />{" "}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 sub-one-left">
                                    <h6>Our Services </h6>
                                    <div className="mid-footer-gd sub-two-right">
                                        
                                        <ul>
                                            
                                            <li>
                                                <Link to="/about">
                                                    <span className="fa fa-angle-double-right mr-2" />{" "}
                                                    About
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/services">
                                                    <span className="fa fa-angle-double-right mr-2" />{" "}
                                                    Services
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/bookonline">
                                                    <span className="fa fa-angle-double-right mr-2" />{" "}
                                                 Bookonline
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/applyForCard">
                                                    <span className="fa fa-angle-double-right mr-2" />
                                                   Apply For Card
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <Link to="/bookings">
                                                    <span className="fa fa-angle-double-right mr-2" />
                                                    Booking
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/addComplaint">
                                                    <span className="fa fa-angle-double-right mr-2" />
                                                    Complaint
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/givefeedback">
                                                    <span className="fa fa-angle-double-right mr-2" />
                                                    Feedback
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/contact">
                                                    <span className="fa fa-angle-double-right mr-2" />
                                                    Contact US
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 sub-one-left">
                                    <h6>Contact Info</h6>
                                    <div className="sub-contact-info">
                                        <p>
                                          New Naroda,Ahmedabad, Gujarat
                                          382330
                                        </p>
                                        <p className="my-3">
                                            Phone:{" "}
                                            <strong>
                                                <Link to="tel:+917487841902">+91 7487841902</Link>
                                            </strong>
                                        </p>
                                        <p>
                                            E-mail:
                                            <strong>
                                                {" "}
                                                <Link to="mailto:hadiyamukund16@example.com">DriveSyncParkX@example.com</Link>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="below-section">
                    <div className="container">
                        <div className="copyright-footer">
                            <div className="columns text-lg-left">
                                <p>
                                    © 2024 DriveSyncParkX. All rights reserved | Designed by{" "}
                                    <Link to="https://mukundportfolio.000webhostapp.com/">Mukund Hadiya</Link>
                                </p>
                            </div>
                            <ul className="columns text-lg-right">
                                <li>
                                    <Link to="/">Privacy Policy</Link>
                                </li>
                                <li>|</li>
                                <li>
                                    <Link to="/">Terms Of Use</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* copyright */}
            </section>
        </footer>
    );
}

export default Footer;
