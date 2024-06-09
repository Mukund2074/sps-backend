import React, { useState, useEffect, useCallback } from 'react';
import CardReactFormContainer from "card-react";
import Header from '../Components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import * as EmailJS from 'emailjs-com';

export default function Payment() {
    const [hoverIndex, setHoverIndex] = useState(null);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [charge, setCharge] = useState(0);
    const [sessioninfo, setSessioninfo] = useState({});
    const [isTimeFixed, setIsTimeFixed] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });
    const location = useLocation();
    const { cardData } = location.state;
    const Navigate = useNavigate();

    const calculateCharge = useCallback(() => {
        const start = new Date(fromTime);
        const end = new Date(toTime);
        const diff = (end - start) / (1000 * 60 * 60); // difference in hours

        let ratePerHour = 10; // Default rate per hour
        if (diff < 1) {
            setCharge(10); // If duration is less than 1 hour, charge 10
        } else if (diff > 0) {
            setCharge(diff * ratePerHour); // Calculate charge based on duration * rate per hour
        } else {
            setCharge(0); // Set charge to 0 if there's no duration
        }
    }, [fromTime, toTime]);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.post('http://localhost:8000/user/usersession');
                setSessioninfo(response.data.sessionData.session);
                console.log(response.data.sessionData.session);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSession();
    }, []); // Empty dependency array to run only once on component mount

    useEffect(() => {
        if (isTimeFixed && fromTime && toTime) {
            calculateCharge();
        }
    }, [fromTime, toTime, isTimeFixed, calculateCharge]);

    const handleFromTimeChange = (date) => {
        if (date && date.toISOString) {
            setFromTime(date.toISOString());
            if (toTime && new Date(toTime) <= date) {
                setToTime('');
            }
        }
    };

    const handleToTimeChange = (date) => {
        if (date && date.toISOString) {
            setToTime(date.toISOString());
        }
    };

    const handleFixTime = () => {
        const now = new Date();
        const fromDate = new Date(fromTime);
        const toDate = new Date(toTime);
        const maxDate = new Date();
        maxDate.setHours(now.getHours() + 48);

        if (fromDate <= now) {
            alert("Please select a time of future in slot booking time.");
            return;
        }
        if (toDate <= fromDate) {
            alert("Please select a time which is after the time of booking.");
            return;
        }
        if (toDate > maxDate) {
            alert("We do not accept more than 48 hours booking time.");
            return;
        }

        setIsTimeFixed(true);
        calculateCharge();
        console.log(fromTime, toTime, charge);
    };

    const isValidDate = (current) => {
        const now = new Date();
        const maxDate = new Date();
        maxDate.setHours(now.getHours() + 48);
        return current.isAfter(now) && current.isBefore(maxDate);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const sendEmail = async () => {
        try {
            const response = await EmailJS.send(
                'sps', // Replace with your EmailJS service ID
                'template_1olquug', // Replace with your EmailJS template ID
                {
                    to_email: sessioninfo.email, // Dynamically specify recipient email address
                    to_name: sessioninfo.email,
                    message: 'Your payment was successful.',
                    area: cardData.Name,
                    Zipcode: cardData.Zipcode,
                    Locality: cardData.Locality,
                    fromTime: fromTime,
                    toTime: toTime,
                    charge: charge
                },
                'OdgX-RtTLKIJGeJLI' // Replace with your EmailJS user ID
            );

            console.log('Email sent:', response);
        } catch (error) {
            console.error('Email error:', error);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log("Data being sent:", {
            cardData,
            cardDetails,
            fromTime,
            toTime,
            charge
        });
        try {
            const response = await axios.post('http://localhost:8000/user/payment', {
                cardData,
                cardDetails,
                fromTime,
                toTime,
                sessioninfo,
                charge
            });
            console.log(response.data);

            if (response.data.success) {
                alert('Payment Successful!');
                console.log(response.data.data);
                Navigate('/bookings', { state: { data: response.data.data } });
                sendEmail();
            } else {
                alert('Payment Failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('An error occurred during payment processing.');
        }
    };

    return (
        <div>
            <Header />
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">Payment </h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span
                                    className="fa fa-angle-double-right mx-2"
                                    aria-hidden="true"
                                />
                                Payment
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mb-4">
                        <div className="causes-grid-info"
                            style={{
                                border: hoverIndex === 0 ? "1px solid red" : "1px solid white",
                                margin: '10px',
                                borderRadius: '40px',
                                transition: 'all 0.3s ease-in-out',
                                transform: hoverIndex === 0 ? "scale(1.05)" : "scale(1)",
                                boxShadow: hoverIndex === 0 ? "0 0 20px red" : "none",
                                zIndex: hoverIndex === 0 ? 2 : 1,
                                position: 'relative'
                            }}
                            onMouseEnter={() => setHoverIndex(0)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            <div className="card-body">
                            <span className="cause-title-wrap">
                                <h4 className="cause-title">{cardData.Name} - {cardData.Locality}</h4>
                                <h4 className="cause-title">{cardData.Zipcode}</h4>
                            </span>
                            <p className="card-text mb-0">
                                Available Slots: {cardData.availableOnlineSlot}
                            </p>
                            <div>
                                <div>
                                    <label htmlFor="fromTime">From Time:</label>
                                    <Datetime
                                        id="fromTime"
                                        value={fromTime ? new Date(fromTime) : ''}
                                        onChange={handleFromTimeChange}
                                        isValidDate={isValidDate}
                                        inputProps={{ placeholder: 'Select From Time', required: true }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat="HH:mm"
                                        className="time-picker"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toTime">To Time:</label>
                                    <Datetime
                                        id="toTime"
                                        value={toTime ? new Date(toTime) : ''}
                                        onChange={handleToTimeChange}
                                        isValidDate={(current) => {
                                            const fromDate = new Date(fromTime);
                                            const maxDate = new Date(fromDate);
                                            maxDate.setHours(fromDate.getHours() + 48);
                                            return current.isAfter(fromDate) && current.isBefore(maxDate);
                                        }}
                                        inputProps={{ placeholder: 'Select To Time', required: true }}
                                        dateFormat="YYYY-MM-DD"
                                        timeFormat="HH:mm"
                                        className="time-picker"
                                    />
                                </div>
                                <button onClick={handleFixTime} className='btn btn-secondary mt-3'>Fix This Time</button>
                            </div>
                            <span className="cause-title-wrap">
                                <h4 className="cause-title">Charge Should be = {charge.toFixed(2)} INR</h4>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <CardReactFormContainer container="card-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="number">Card number</label>
                                            <input
                                                className="form-control"
                                                id="number"
                                                placeholder="Card number"
                                                type="text"
                                                name="number"
                                                value={cardDetails.number}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Full name</label>
                                            <input
                                                className="form-control"
                                                id="name"
                                                placeholder="Full name"
                                                type="text"
                                                name="name"
                                                value={cardDetails.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="expiry">MM/YYYY</label>
                                            <input
                                                className="form-control"
                                                id="expiry"
                                                placeholder="MM/YYYY"
                                                type="text"
                                                name="expiry"
                                                value={cardDetails.expiry}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cvc">CVC</label>
                                            <input
                                                className="form-control"
                                                id="cvc"
                                                placeholder="CVC"
                                                type="text"
                                                name="cvc"
                                                value={cardDetails.cvc}
                                                maxLength={3}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div id="card-wrapper"></div>
                                        <center><button onClick={handlePayment} className='btn btn-primary m-5'>Pay Now</button></center>
                                    </div>
                                </div>
                            </div>
                        </CardReactFormContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    
    
}
