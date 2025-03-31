import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsersService from "./service/UsersService";

export default function AdminPage1() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await UsersService.getAllUsers(token);

            if (response.statusCode === 200) {
                setUsers(response.userList);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("Failed to fetch users");
            console.error("Error: ", err);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem("token");
            await UsersService.deleteUser(userId, token);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            console.error("Delete Error: ", err);
            setError("Failed to delete user");
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/products">E-Commerce App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li> 
                            <li className="nav-item">
                                <Link className="nav-link" to="/adminPage2">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Home">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content with Gradient Background */}
            <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
                <div className="container p-4 bg-white shadow rounded">
                    <h2 className="text-center text-primary mb-4">User List</h2>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <div className="table-responsive">
                        <table className="table table-hover table-striped border">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No</th>
                                    <th>Role</th>
                                    <th>Preferences</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNo}</td>
                                            <td>{user.role}</td>
                                            <td>{user.preferences?.join(", ") || "N/A"}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm rounded-pill px-3"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
