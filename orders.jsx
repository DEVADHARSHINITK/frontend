import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
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
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/adminPage2">Add Product</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/adminPage1">Users List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Home">Log Out</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content with Gradient Background */}
      <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
        <div className="container bg-white p-4 shadow rounded">
          <h2 className="mb-4 text-center text-primary fw-bold">Delivery Orders</h2>

          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm text-center">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="align-middle">
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>Rs {order.totalPrice}/-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
