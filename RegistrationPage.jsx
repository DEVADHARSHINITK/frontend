import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "./service/UsersService";
import Navbar from "./Navbar";

function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        preferences: [],
        phoneNo: '',
        address: '',
        email: '',
        password: '',
        role: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked
                    ? [...prevState.preferences, value]
                    : prevState.preferences.filter((pref) => pref !== value),
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await UsersService.register(formData, token);
            setFormData({
                name: '', dob: '', gender: '', preferences: [],
                phoneNo: '', address: '', email: '', password: '', role: '',
            });
            alert('User registered successfully');
            navigate('/register-success');
        } catch (error) {
            console.error('Error: ', error);
            alert('Error occurred');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', width: '100vw', minHeight: '100vh', paddingTop: '80px' }}>
                <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '600px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', backdropFilter: 'blur(10px)', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)' }}>
                    <h3 className="card-title mb-4" style={{ color: '#007bff' }}>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input className="form-control" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender:</label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleInputChange} required />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleInputChange} required />
                                <label className="form-check-label">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleInputChange} required />
                                <label className="form-check-label">Other</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preferences:</label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="preferences" value="Veg" checked={formData.preferences.includes("Veg")} onChange={handleInputChange} />
                                <label className="form-check-label">Veg</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="preferences" value="Fruits" checked={formData.preferences.includes("Fruits")} onChange={handleInputChange} />
                                <label className="form-check-label">Fruits</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="preferences" value="Electronics" checked={formData.preferences.includes("Electronics")} onChange={handleInputChange} />
                                <label className="form-check-label">Electronics</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="preferences" value="Groceries" checked={formData.preferences.includes("Groceries")} onChange={handleInputChange} />
                                <label className="form-check-label">Groceries</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" name="role" value={formData.role} onChange={handleInputChange} required>
                                <option value="">Select Role</option>
                                <option value="CUSTOMER">Customer</option>
                                <option value="DELIVERY">Delivery Person</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit" style={{ backgroundColor: '#6A82FB', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegistrationPage;
