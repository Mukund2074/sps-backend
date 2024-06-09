import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Services() {
    useEffect(() => {
        window.scrollTo(0, 0, { behavior: "smooth" });
    }, []);

    return (
        <>
            <Header />
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">Services</h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span className="fa fa-angle-double-right mx-2" aria-hidden="true" />{" "}
                                Services{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <div className="w3-services py-5">
                <div className="container py-lg-4">
                    <div className="title-content text-left mb-lg-5 mb-4">
                        <h6 className="sub-title">Our Services</h6>
                        <h3 className="hny-title">Smart Parking Solutions</h3>
                        <p>
                            We offer a range of services to optimize your parking operations and enhance the user experience.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/smart-parking-management">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="https://media.licdn.com/dms/image/D4D12AQFw-DtymX5edQ/article-cover_image-shrink_720_1280/0/1690519878121?e=2147483647&v=beta&t=ijw2AYhKSLclSrvcSimJ2dknHVtqUCx7LKCkIIJhuxw" className="card-img-top" alt="Smart Parking Management" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/smart-parking-management" className="card-title">
                                        <h4 className="card-title">Smart Parking Management</h4>
                                    </a>
                                    <p className="card-text">
                                        Our advanced systems help you manage parking spaces efficiently, reducing congestion and improving user experience.
                                    </p>
                                    <a href="/service-detail/smart-parking-management" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/iot-devices">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="https://www.simplilearn.com/ice9/free_resources_article_thumb/iot_devices.jpg" className="card-img-top" alt="IoT Devices" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/iot-devices" className="card-title">
                                        <h4 className="card-title">IoT (Internet of Things) Devices Used</h4>
                                    </a>
                                    <p className="card-text">
                                        We use the latest IoT technology to provide real-time data and insights, enhancing the efficiency of parking management.
                                    </p>
                                    <a href="/service-detail/iot-devices" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/rfid-cards">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="https://m.media-amazon.com/images/I/41wKEA9ewFL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg" className="card-img-top" alt="RFID Cards" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/rfid-cards" className="card-title">
                                        <h4 className="card-title">RFID Cards Provided by Us</h4>
                                    </a>
                                    <p className="card-text">
                                        Our RFID cards offer secure and efficient access control for parking facilities, ensuring smooth entry and exit.
                                    </p>
                                    <a href="/service-detail/rfid-cards" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/user-friendly-website">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="assets/images/web.png" className="card-img-top" alt="User-Friendly Website" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/user-friendly-website" className="card-title">
                                        <h4 className="card-title">User-Friendly Website Integration</h4>
                                    </a>
                                    <p className="card-text">
                                        Our website integration provides a seamless and user-friendly interface for managing parking services online.
                                    </p>
                                    <a href="/service-detail/user-friendly-website" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/smart-sensors">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3cmGPTuQVk4h0Nup48FV6gYfqlGKsFJUUKeNxayEDJBxXz9h36HyDf1BCvAVqbOCfLmI&usqp=CAU" className="card-img-top" alt="Smart Sensors" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/smart-sensors" className="card-title">
                                        <h4 className="card-title">Smart Sensors Used</h4>
                                    </a>
                                    <p className="card-text">
                                        Our smart sensors detect available parking spaces in real-time, reducing the time spent searching for a spot.
                                    </p>
                                    <a href="/service-detail/smart-sensors" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 bg-transparent border-danger">
                                <a href="/service-detail/live-support">
                                    <img style={{ height: '200px', objectFit: 'cover' }} src="https://www.svgrepo.com/show/192522/customer-service-support.svg" className="card-img-top" alt="Live 24x7 Support" />
                                </a>
                                <div className="card-body">
                                    <a href="/service-detail/live-support" className="card-title">
                                        <h4 className="card-title">Live 24x7 Support</h4>
                                    </a>
                                    <p className="card-text">
                                        Our dedicated support team is available around the clock to assist you with any issues or inquiries.
                                    </p>
                                    <a href="/service-detail/live-support" className="btn btn-primary mt-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Services;
