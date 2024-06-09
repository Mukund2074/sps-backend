import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = React.useState({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/user/usersignup", registerData
            )

            const { success } = response.data;
            if (success) {
                toast.success("Register Successful", {
                    autoClose: 1500, onClose: () => navigate("/login"),
                });
            }
        } catch (error) {
            console.log("Reg Err: ", error);
            if (error.response) {
                toast.error(error.response.data.message, {
                    autoClose: 1500,
                })
            }
        }
    }

    return (
        <div className="login-page">
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-lg-6 col-md-8">
                        <div className="form-container">
                            <form onSubmit={handleSubmit} className="form-horizontal">
                                <h3 className="title">Member Register</h3>
                                <div className="form-group">
                                    <span className="input-icon">
                                        <i className="fa fa-user" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={registerData.name}
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group ">
                                    <span className="input-icon">
                                        <i className="fa fa-envelope" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={registerData.email}
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="form-group">
                                    <span className="input-icon">
                                        <i className="fa fa-lock" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        name="phoneNo"
                                        onChange={handleChange}
                                        value={registerData.phoneNo}
                                        maxLength={10}
                                        placeholder="Phone No"
                                    />
                                </div>
                                <div className="form-group ">
                                    <span className="input-icon">
                                        <i className="fa fa-lock" />
                                    </span>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={registerData.password}
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="btn signin">Register</button>
                            </form>
                            <div className="form-icon justify-content-center align-items-center ">
                                <i className="fa fa-user-circle" />
                                <span className="signup">
                                    <Link to={"/login"}>Already have account? Login</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
