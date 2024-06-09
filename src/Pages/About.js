import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function About() {
    useEffect(() => {

        window.scrollTo(0, 0, { behavior: "smooth" });
    })
    return (
        <>
            <Header />
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">About Us</h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span
                                    className="fa fa-angle-double-right mx-2"
                                    aria-hidden="true"
                                />{" "}
                                About{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* //about breadcrumb */}
            {/* /content-6*/}
            <section className="w3l-content-6">
                {/* /content-6-main*/}
                <div className="content-6-mian py-5">
                    <div className="container py-lg-5">
                        <div className="content-info-in row">
                            <div className="col-lg-6">
                                <img src="https://www.s-ge.com/sites/default/files/styles/sge_header_lg/public/article/images/bild_27_dsc0368canon_web945.jpg?itok=Mdml-7DM" alt="someting not proper" style={{ width: "100%", height: "100%" }} className="img-fluid" />
                            </div>
                            <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq align-self  pl-lg-5">
                                <div className="title-content text-left mb-2">
                                    <h6 className="sub-title">Who We Are</h6>

                                    <h3 className="hny-title">
                                        Revolutionizing Parking with Innovation and Technology
                                    </h3>
                                </div>
                                <p className="mt-3">
                                    At the forefront of smart parking solutions, we blend state-of-the-art technology with innovative IoT integration to transform how you park. Our passion drives us to develop user-friendly, efficient, and intelligent systems designed to optimize space and enhance urban mobility. Join us on our journey to make parking hassle-free and part of the smart city revolution.
                                </p>
                            </div>
                            <div className="col-lg-6 mt-5 about-right-faq align-self order2">
                                <div className="title-content text-left mb-2">
                                    <h6 className="sub-title">Who We Are</h6>
                                    <h3 className="hny-title">
                                        Leading the Future of Smart Parking Solutions
                                    </h3>
                                </div>
                                <p className="mt-3">
                                    We are pioneers in the integration of advanced technology and IoT to revolutionize the parking experience. Our mission is to deliver innovative, efficient, and user-friendly smart parking systems that optimize space and streamline urban mobility. With a focus on sustainability and cutting-edge solutions, we are dedicated to transforming cities into smarter, more connected environments. Join us in making parking not just a necessity, but a seamless and intelligent part of your daily life.
                                </p>
                            </div>
                            <div className="col-lg-6 mt-5 pl-lg-4">
                                <img src="https://b2bblogassets.airtel.in/wp-content/uploads/2022/05/iot-based-smart-parking-scaled.jpg" alt='not provided' className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //content-6*/}
          
          {/*//content-5*/}
<div className="w3l-content-5 py-5">
    <div className="container py-lg-4">
        <div className="row content-5-grids">
            <div className="col-lg-4 col-md-6 content-5-one">
                <div className="content5-gd-ingf">
                    <div className="icon-holder mb-3">
                        <span
                            className="fa fa-car service-icon"
                            aria-hidden="true"
                        />
                    </div>
                    <h4>Real-time Parking Availability</h4>
                    <p>
                        Utilize IoT sensors to monitor and display real-time parking space availability. 
                        Our advanced system ensures you always find a spot without hassle.
                    </p>
                  
                </div>
            </div>
            <div className="col-lg-4 col-md-6 content-5-one">
                <div className="content5-gd-ingf">
                    <div className="icon-holder mb-3">
                        <span
                            className="fa fa-microchip service-icon"
                            aria-hidden="true"
                        />
                    </div>
                    <h4>RFID-Based Access Control</h4>
                    <p>
                        Enhance security and convenience with our RFID-based access control. 
                        Seamlessly enter and exit parking facilities using RFID technology for a smooth experience.
                    </p>
                 
                </div>
            </div>
            <div className="col-lg-4 col-md-6 content-5-one">
                <div className="content5-gd-ingf">
                    <div className="icon-holder mb-3">
                        <span
                            className="fa fa-mobile service-icon"
                            aria-hidden="true"
                        />
                    </div>
                    <h4>Mobile Website Integration</h4>
                    <p>
                        Stay connected and manage your parking effortlessly with our user-friendly mobile website. 
                        Get real-time updates, reserve spaces, and receive notifications all from the convenience of your smartphone.
                    </p>
                 
                </div>
            </div>
        </div>
    </div>
</div>
{/*//content-5*/}

            {/* team */}
            <section className="w3l-team-main py-5" id="team">
    <div className="container py-lg-4">
        <div className="title-content text-center mb-lg-5 mb-4">
            <h6 className="sub-title">Our Team</h6>
            <h3 className="hny-title">Meet Our Experts</h3>
        </div>
        <div className="row inner-sec-w3layouts-w3pvt-lauinfo">
            <div className="col-md-4 col-12">
                <div className="team-grids text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/4140/4140052.png" className="img-fluid" alt='' />
                    <div className="team-info">
                        <div className="caption">
                            <h4>Mukund Hadiya</h4>
                            <h6>Full Stack Developer</h6>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="col-md-4 col-12">
                <div className="team-grids text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/9193/9193899.png" className="img-fluid" alt='' />
                    <div className="team-info">
                        <div className="caption">
                            <h4>Himanshu Vaishnav</h4>
                            <h6>Backend Developer</h6>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="col-md-4 col-12 mt-md-0 mt-4">
                <div className="team-grids text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" className="img-fluid" alt='' />
                    <div className="team-info">
                        <div className="caption">
                            <h4>Honey Shah</h4>
                            <h6>UI/UX Designer</h6>
                        </div>
                    </div>
                </div>
               
            </div>
           
        </div>
    </div>
</section>

            <Footer />
        </>
    );
}

export default About;
