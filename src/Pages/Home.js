import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

function Home() {
    useEffect(() => {

        window.scrollTo(0, 0, { behavior: "smooth" });
    })
    return (
        <>
            {/*header*/}
            <Header />
            {/*/header*/}
            {/* //bottom-grids */}
            <div className="w3l-bottom-grids">
                <div className="container-fluid px-0">
                    <div className="bottomhny-grids-sec" style={{ marginTop: '5rem' }}>
                        <div className="bottomhny-1">
                            <div className="bottomhny-gd-ingf">
                                <h4>Satisfaction Guaranteed .</h4>
                            </div>
                        </div>
                        <div className="bottomhny-1 bottomhny-2">
                            <div className="bottomhny-gd-ingf">
                                <h4>Park your car and feel free...</h4>
                            </div>
                        </div>
                        <img src="https://b2bblogassets.airtel.in/wp-content/uploads/2022/05/iot-based-smart-parking-scaled.jpg" style={{ height: '90%', width: '90%' }}  alt="smart parking"/>

                    </div>
                </div>
            </div>
            {/* //bottom-grids */}
            {/* /content-3*/}
            <section className="w3l-content-3">
                {/* /content-3-main*/}
                <div className="content-3-mian py-5">
                    <div className="container py-lg-5">
                        <div className="content-info-in row">
                            <div className="col-lg-6">
                                <img src="https://images.pexels.com/photos/63294/autos-technology-vw-multi-storey-car-park-63294.jpeg?cs=srgb&dl=pexels-pixabay-63294.jpg&fm=jpg" alt="smart parking" className="img-fluid" />
                            </div>
                            <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq align-self  pl-lg-5">
                                <div className="title-content text-left mb-2">
                                    <h6 className="sub-title">Who We Are</h6>
                                    <h3 className="hny-title">

                                        WE ARE ADVANCED TECHNOLOGY OF PARKING SYSTEM
                                    </h3>
                                </div>
                                <p className="mt-3">
                                    Smart parking systems use various sensors such as ultrasonic, infrared, or magnetic sensors installed in individual parking spaces. These sensors detect the presence or absence of vehicles in each spot
                                </p>
                                <Link
                                    to="/about"
                                    className="btn btn-style btn-primary mt-md-5 mt-4"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* //content-3*/}
            {/* /features-4 */}
            <section className="features-4">
                <div className="features4-block py-5">
                    <div className="container py-lg-4">
                        <div className="title-content text-center mb-lg-5 mt-4">
                            <h6 className="sub-title">DriveSyncParkX</h6>
                            <h3 className="hny-title">How To Book Spot</h3>
                            <p className="fea-para">

                            </p>
                        </div>
                        <div className="row features4-grids text-left mt-lg-4">
                            <div className="col-lg-3 col-md-6 features4-grid mt-4">
                                <div className="features4-grid-inn">
                                    <div className="img-featured">
                                        <div className="ch-item ">
                                            <img className="ch-item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRswmt6tGeZPa1OoX-Rc2bR717kPOAWFDpHA&usqp=CAU" alt="smart parking" />

                                            <div className="ch-info-wrap">
                                                <div className="ch-info">

                                                    <div className="ch-info-front">
                                                        <img className="ch-item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRswmt6tGeZPa1OoX-Rc2bR717kPOAWFDpHA&usqp=CAU" alt="smart parking" />
                                                    </div>
                                                    <div className="ch-info-back">
                                                        <h5>DriveSyncParkX</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features4-rightinfo">
                                        <h5>
                                            <Link style={{ color: '#d90429' }}>1. Select Parking Area</Link>
                                        </h5>
                                        <p>
                                            Select parking area based on your requirement
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 features4-grid mt-4">
                                <div className="features4-grid-inn">
                                    <div className="img-featured">
                                        <div className="ch-item ">
                                            <img className="ch-item " src="https://www.shutterstock.com/image-illustration/smart-parking-guidance-system-inground-260nw-1251560269.jpg" alt="smart parking"/>
                                            <div className="ch-info-wrap">
                                                <div className="ch-info">
                                                    <div className="ch-info-front" >
                                                        <img className="ch-item" src="https://www.shutterstock.com/image-illustration/smart-parking-guidance-system-inground-260nw-1251560269.jpg" alt="smart parking" /></div>
                                                    <div className="ch-info-back">
                                                        <h5>DriveSyncParkX</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features4-rightinfo">
                                        <h5>
                                            <Link style={{ color: '#d90429' }}>2. Fill Required Field</Link>
                                        </h5>
                                        <p>
                                            Fill necessary details for book spot.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 features4-grid mt-4">
                                <div className="features4-grid-inn">
                                    <div className="img-featured">
                                        <div className="ch-item">
                                            <img className="ch-item" src="https://d1krbhyfejrtpz.cloudfront.net/blog/wp-content/uploads/2021/12/07140942/IoT-Based-Smart-Parking-System-A-Complete-Development-Guide.jpg" alt="smart parking" />
                                            <div className="ch-info-wrap">
                                                <div className="ch-info">
                                                    <div className="ch-info-front" >
                                                        <img className="ch-item" src="https://d1krbhyfejrtpz.cloudfront.net/blog/wp-content/uploads/2021/12/07140942/IoT-Based-Smart-Parking-System-A-Complete-Development-Guide.jpg" alt="smart parking" /></div>
                                                    <div className="ch-info-back">
                                                        <h5>DriveSyncParkX</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features4-rightinfo">
                                        <h5>
                                            <Link style={{ color: '#d90429' }}>3. Make Payment</Link>
                                        </h5>
                                        <p>
                                            Pay bill based on time slot you selected
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 features4-grid mt-4">
                                <div className="features4-grid-inn">
                                    <div className="img-featured">
                                        <div className="ch-item">
                                            <img className="ch-item" src="https://media.istockphoto.com/id/519196006/photo/aerial-view-of-parking-lot.jpg?s=612x612&w=0&k=20&c=nYTYkMoNRpOujZLJLFLX-8LPKjjnSi5ub9Yd5Ls_YKw=" alt="smart parking" />
                                            <div className="ch-info-wrap">
                                                <div className="ch-info">
                                                    <div className="ch-info-front ch-img-4" >
                                                        <img className="ch-item" src="https://media.istockphoto.com/id/519196006/photo/aerial-view-of-parking-lot.jpg?s=612x612&w=0&k=20&c=nYTYkMoNRpOujZLJLFLX-8LPKjjnSi5ub9Yd5Ls_YKw="  alt="smart parking"/>
                                                    </div>

                                                    <div className="ch-info-back">
                                                        <h4>DriveSyncParkX</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features4-rightinfo">
                                        <h5>
                                            <Link style={{ color: '#d90429' }}>4. Drop Feedback</Link>
                                        </h5>
                                        <p>
                                            FeedBack Makes better interactions between us
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*//features-4 */}

            <section className="w3l-pricing">
                <div className="py-5" id="pricing">
                    <div className="container py-lg-5">
                        <div className="title-content text-center mb-5">
                            <h6 className="sub-title">OUR PACKAGES</h6>
                            <h3 className="hny-title"> Pricing Plans</h3>
                            <p className="fea-para">
                                Choose accordinig to your comfort
                            </p>
                        </div>
                        <div className="row t-in d-flex align-items-center justify-content-center" >

                            <div className="col-lg-4 col-md-6 price-main-info mt-md-0 mt-4">
                                <div className="price-inner card box-shadow active">
                                    <div className="card-body">
                                        <label className="price-label">Recommended</label>
                                        <h4 className="text-uppercase text-center mb-3">
                                            RFID LIFETIME CARD
                                        </h4>
                                        <h5 className="card-title pricing-card-title">
                                            <span className="align-top">₹</span>100
                                        </h5>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>

                                                <span className="fa fa-check" /> Minimum Balance Required
                                            </li>
                                            <li>

                                                <span className="fa fa-check" /> 500 ₹ is minimum
                                            </li>
                                            <li>

                                                <span className="fa fa-check" /> Rechargable
                                            </li>
                                            <li>

                                                <span className="fa fa-check" /> Apply Now
                                            </li>

                                        </ul>
                                        <div className="read-more mt-4 pt-lg-2">
                                            <Link to="/applyForCard" className="btn btn-style btn-primary">

                                                Book Your Card
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 price-main-info mt-md-0 mt-4">
                                <div className="price-inner card box-shadow active">
                                    <div className="card-body">
                                       
                                        <h4 className="text-uppercase text-center mb-3">
                                            Regular Booking 
                                        </h4>
                                        <h5 className="card-title pricing-card-title">
                                            <span className="align-top">₹</span>10
                                        </h5>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>

                                                <span className="fa fa-check" />Use online website
                                            </li>
                                            <li>

                                                <span className="fa fa-check" />Book from anywhere
                                            </li>
                                            <li>

                                                <span className="fa fa-check" />10 ₹ per hour
                                            </li>
                                            <li>

                                                <span className="fa fa-check" />Email receipt
                                            </li>

                                        </ul>
                                        <div className="read-more mt-4 pt-lg-2">
                                            <Link to="/bookonline" className="btn btn-style btn-primary">

                                                Book Your slot
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* middle */}
            <div className="middle py-5">
    <div className="container py-xl-5 py-lg-3" style={{
        position: 'relative',
        background: `url('https://advcloudfiles.advantech.com/web/Images/Solutions/iretail/solutions/public-space-service/parking_service_system_banner.jpg')`,
        backgroundSize: 'cover'
    }}>
        <div style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
            backdropFilter: 'blur(5px)',
            zIndex: 1
        }}></div>
        <div className="welcome-left text-left py-3" style={{ position: 'relative', zIndex: 2 }}>
            <div className="title-content">
                <h6 className="sub-title">Call Us</h6>
                <h3 className="hny-title two mb-2">
                    Any Doubt Related to Card?
                </h3>
                <p>
                    Give us a call today at{" "}
                    <Link className="btn btn-circle btn-white" to="tel:+917487841902">+(91)DriveSyncNo</Link>
                </p>
            </div>
        </div>
    </div>
</div>

            {/* //middle */}
            {/*/testimonials*/}

            {/*//testimonials*/}
            {/* footer-66 */}
            <Footer />
        </>
    );
}

export default Home;
