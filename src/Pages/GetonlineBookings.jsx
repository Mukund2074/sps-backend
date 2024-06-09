import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export default function GetOnlineBooking() {
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: 'smooth' });

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/getonlinebooking');
        console.log(response.data);
        setBooking(response.data.bookings);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: 'SR NO.',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '100px',
      cell: (row, index) => (
        <div title={`SR NO.: ${index + 1}`} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          {index + 1}
        </div>
      ),
    },
    {
      name: 'Payment Time',
      selector: row => new Date(row.timestamp).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Booking From Time',
      selector: row => new Date(row.fromTime).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Booking To Time',
      selector: row => new Date(row.toTime).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Parking Slot Name',
      selector: row => `${row.cardData.Name} / ${row.cardData.Locality} / ${row.cardData.Zipcode}`,
      sortable: true,
    },
  ];

  return (
    <>
      <Header />
      <section className="w3l-about-breadcrumb position-relative text-center">
        <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
          <div className="container py-lg-5 py-3">
            <h2 className="title">Current Online Booking</h2>
            <ul className="breadcrumbs-custom-path mt-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">
                <span className="fa fa-angle-double-right mx-2" aria-hidden="true" />
                Current Online Booking
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w3l-content-6">
        <div className="w3-services py-5">
          <div className="container py-lg-4">
            <div className="row w3-services-grids">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
             <div className="col-lg-12 d-flex flex-column d-md-block">
                 <DataTable
                  data={booking}
                  columns={columns}
                  pagination
                  highlightOnHover
                  responsive
                  striped
                  theme="dark"
                />
             </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
