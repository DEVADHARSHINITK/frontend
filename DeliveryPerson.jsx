import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function DeliveryPerson() {
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

  const markAsDelivered = async (orderId) => {
    try {
      await axios.put(`http://localhost:8080/orders/${orderId}/deliver`);
      setOrders(orders.filter(order => order.id !== orderId));
      alert("Order marked as delivered!");
    } catch (error) {
      console.error("Error marking order as delivered", error);
    }
  };

  return (
    <>
    {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
              <Link className="navbar-brand" to="/products">E-Commerce App</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><Link className="nav-link" to="/Home">Logout</Link></li>
                </ul>
              </div>
            </div>
          </nav>
    
      <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
        <div className="container bg-white p-4 shadow rounded">
          <h2 className="mb-4 text-center text-primary fw-bold">Delivery Orders</h2>

          {orders.length === 0 ? (
            <p className="text-center text-danger">No pending deliveries</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover shadow-sm text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="align-middle">
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>Rs {order.totalPrice}/-</td>
                      <td>
                        <button className="btn btn-success" onClick={() => markAsDelivered(order.id)}>
                          Mark as Delivered
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
