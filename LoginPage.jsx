import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "./service/UsersService";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UsersService.login(email, password);
            console.log(userData);
            if (userData.role === 'ADMIN') {
                navigate('/dashboard');
            }
            else if (userData.role === 'CUSTOMER') {
                navigate('/orderList');
            }
            else if (userData.role === 'DELIVERY') {
                navigate('/deliveryPerson');
            }
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-sm py-3" style={{ backgroundColor: '#1b1f3b'}}>
                <div className="container">
                    {/* Brand */}
                    <Link className="navbar-brand fw-bold fs-4 text-white" to="/products">
                        🛒 E-Commerce
                    </Link>

                    {/* Toggler for Mobile View */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto gap-3">
                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center" to="/">
                                    🏠 Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register" style={{ backgroundColor: '#ffffff', color: '#007bff', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold' }}>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
                <div className="card shadow-lg p-4 text-center" style={{ maxWidth: "500px", width: "100%", backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)" }}>
                    <h3 className="card-title mb-4 text-primary">Login to Your Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <h6 className={`text-center ${error === 'Login Successful' ? 'text-success' : 'text-danger'}`}>
                                {error}
                            </h6>
                        )}
                        <div className="mb-3">
                            <button className="btn btn-primary w-100 py-2" type="submit" style={{ backgroundColor: "#6A82FB", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <small>
                            Don't have an account?{" "}
                            <a href="/register" className="text-primary"><u>Register here</u></a>
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
