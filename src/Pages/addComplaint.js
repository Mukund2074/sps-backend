import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddComplaint() {
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
        aadhaarNo: "",
        vehicleNo: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0, { behavior: "smooth" });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setComplaint((prevData) =>
            ({
                ...prevData,
                [name]: value
            })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(complaint);
        try {
            const response = await axios.post(
                "http://localhost:8000/user/addComplaint",
                complaint
            );

            const { success } = response.data;
            if (success) {
                toast.success(response.data.message, {
                    autoClose: 1500, onClose: () => navigate("/"),
                });
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.message, {
                    autoClose: 1500, onClose: () => navigate("/"),
                })
            } else {
                toast.error(error.response.data.message, {
                    autoClose: 1500,
                })
            }
        }
    }

    return (
        <>
            <Header />
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">Add Complaint</h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span
                                    className="fa fa-angle-double-right mx-2"
                                    aria-hidden="true"
                                />
                                Add Complaint
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
                                            <h6 className="sub-title">Add Complaint</h6>
                                            <h3 className="hny-title">Register your Complaint</h3>
                                        </div>
                                        <p className="mt-3 mb-4 pr-lg-5">
                                            Welcome to our complaint page. Please fill out
                                            the form below to submit your complaint.
                                        </p>
                                        <h6 className="mb-4">
                                            For any inquiries or assistance, feel free to contact us
                                            using the details below.
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
                                    <h3 className="hny-title mb-lg-5 mb-4">Fill out the Form</h3>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="signin-form"
                                >
                                    <div className="form-input">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={complaint.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={complaint.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-input">
                                        <div className="form-input">
                                            <textarea
                                                placeholder="Complaint"
                                                name="complaint"
                                                value={complaint.complaint}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
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
            </section>
            <Footer />
        </>
    );
}

export default AddComplaint;
