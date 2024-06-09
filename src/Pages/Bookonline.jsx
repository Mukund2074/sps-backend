import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";

export default function Bookonline() {
    const [areas, setAreas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoverIndex, setHoverIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('http://localhost:8000/user/getAreas')
            .then((response) => {
                if (Array.isArray(response.data.areas)) {
                    setAreas(response.data.areas);
                    console.log(response);
                } else {
                    console.error("Areas data is not an array:", response.data.areas);
                }
            })
            .catch(error => {
                console.error("Error fetching areas:", error);
            });
        } catch (error) {
            console.error("Error in useEffect:", error);
        }
    }, []);

    const filteredAreas = areas.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Zipcode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBook = (item) => {
        // Handle book button click
        console.log("Clicked card data:", item);
     
        navigate("/payment", { state: { cardData: item } });
    };

    return (
        <div>
            <Header />
            <section className="w3l-about-breadcrumb position-relative text-center">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container py-lg-5 py-3">
                        <h2 className="title">Book Your Parking Slot</h2>
                        <ul className="breadcrumbs-custom-path mt-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">
                                <span
                                    className="fa fa-angle-double-right mx-2"
                                    aria-hidden="true"
                                />
                                Book Parking Slot
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="container mt-4 mb-4 d-flex align-content-center justify-content-center">
                <label htmlFor="search" className="btn btn-primary">Search:</label>
                <input
                    type="text"
                    placeholder="Search areas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{maxWidth:'auto'}}
                />
            </div>
            <div className="row w3-services-grids d-flex justify-content-center">
                {filteredAreas.map((item, index) => (
                    <div 
                        key={index} 
                        className="causes-grid" 
                        style={{
                            border: hoverIndex === index ? "1px solid red" : "1px solid white",
                            margin: '10px',
                            width: '350px',
                            borderRadius:'40px',
                            transition: 'all 0.3s ease-in-out',
                            transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
                            boxShadow: hoverIndex === index ? "0 0 20px red" : "none"
                        }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <div className="causes-grid-info">
                            <span className="cause-title-wrap">
                                <h4 className="cause-title">{item.Name}<br/>{item.Locality}<br/>{item.Zipcode}</h4>
                            </span>
                            <p className="card-text">
                            Available Slots : {JSON.stringify(item.availableOnlineSlot)}


                            </p>
                           <div className="btn-des">
                           <button 
                                className="btn btn-style btn-primary mt-4" 
                                style={{ borderRadius: '80px' }} 
                                onClick={() => handleBook(item)}
                            >
                                Book
                            </button>
                           </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
