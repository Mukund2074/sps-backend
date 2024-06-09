import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Contact() {
    useEffect(() => {

        window.scrollTo(0, 0, { behavior: "smooth" });
    })
    return (
        <>
            <Header />
            {/*/header*/}
            {/* about breadcrumb */}
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">Contact Us</h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span
                                    className="fa fa-angle-double-right mx-2"
                                    aria-hidden="true"
                                />{" "}
                                Contact{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* //about breadcrumb */}
            <section className="w3l-contact-11">
                <div className="form-41-mian py-5">
                    <div className="container py-lg-4">
                        <div className="row align-form-map">
                            <div className="col-lg-6 contact-left pr-lg-4">
                                <div className="partners">
                                    <div className="cont-details">
                                        <div className="title-content text-left">
                                            <h6 className="sub-title">Contact Us</h6>
                                            <h3 className="hny-title">Get In Touch</h3>
                                        </div>
                                        <p className="mt-3 mb-4 pr-lg-5">
                                            Hi there, We are available 24/7 by fax, e-mail or by
                                            phone. Drop us line so we can talk futher about that.
                                        </p>
                                        <h6 className="mb-4">
                                            {" "}
                                            For more info or inquiry about our products project, and
                                            pricing please feel free to get in touch with us.
                                        </h6>
                                    </div>
                                    <div className="hours">
                                        <h6 className="mt-4">Email:</h6>
                                        <p>
                                            <a href="mailto:hadiyamukund16@example.com">DriveSyncParkX.com</a>
                                        </p>
                                        <h6 className="mt-4">Address:</h6>
                                        <p>
                                            Ahmedabad,Gujarat,india
                                        </p>
                                        <h6 className="mt-4">Contact:</h6>
                                        <p className="margin-top">
                                            <a href="tel:+(91)7487841902">+(91)7487841902</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 form-inner-cont">
                                <div className="title-content text-left">
                                    <h3 className="hny-title mb-lg-5 mb-4">Send Us A Message</h3>
                                </div>
                                <form
                                    action="https://sendmail.w3layouts.com/submitForm"
                                    method="post"
                                    className="signin-form"
                                >
                                    <div className="form-input">
                                        <input
                                            type="text"
                                            name="w3lName"
                                            id="w3lName"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="row con-two">
                                        <div className="col-lg-6 form-input">
                                            <input
                                                type="email"
                                                name="w3lSender"
                                                id="w3lSender"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-6 form-input">
                                            <input
                                                type="text"
                                                name="w3lSubect"
                                                placeholder="Subject"
                                                className="contact-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <textarea
                                            placeholder="Message"
                                            name="w3lMessage"
                                            id="w3lMessage"
                                            required
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="submit-button text-lg-right">
                                        <button type="submit" className="btn btn-style">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001161.424489281!2d-78.01909140705047!3d42.72866436845163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sin!4v1570786994395!5m2!1sen!2sin"
                        frameBorder={0}
                        title="map"
                        allowFullScreen
                    />
                </div>
            </section>
            {/* //contact-form */}
            {/* footer-66 */}
            <Footer />
        </>
    );
}

export default Contact;
