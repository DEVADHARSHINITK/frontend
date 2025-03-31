import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderList() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Product items", error);
    }
  };

  const addToOrder = (item) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find((order) => order.productId === item.id);
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.productId === item.id
            ? { ...order, quantity: order.quantity + 1, totalPrice: (order.quantity + 1) * item.price }
            : order
        );
      }
      return [...prevOrders, { productId: item.id, name: item.name, price: item.price, quantity: 1, totalPrice: item.price }];
    });
  };

  const placeOrder = async () => {
    if (!customerName.trim()) {
      alert("Customer name is required");
      return;
    }
    try {
      await axios.post("http://localhost:8080/orders", {
        customerName,
        orders,
      });
      alert("Order placed successfully!");
      setOrders([]);
      setCustomerName("");
    } catch (error) {
      console.error("Error placing order: ", error);
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
                <Link className="nav-link" to="/Home">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
        <div className="container bg-white p-4 shadow rounded">
          {/* Products Section */}
          <h2 className="mb-4 text-center fw-bold text-primary">Available Products</h2>
          <div className="row">
            {products.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text text-muted">Price: Rs {item.price}/-</p>
                    <button className="btn btn-success w-100" onClick={() => addToOrder(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order List Section */}
          <h2 className="mt-5 text-center fw-bold text-primary">Your Order</h2>
          <div className="mb-4">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          {orders.length === 0 ? (
            <p className="text-center text-muted">No items in order</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.productId}>
                      <td>{order.name}</td>
                      <td>Rs {order.price}/-</td>
                      <td>{order.quantity}</td>
                      <td>Rs {order.totalPrice}/-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Place Order Button */}
          <div className="text-center">
            <button
              className="btn btn-primary w-50 fw-bold"
              onClick={placeOrder}
              disabled={orders.length === 0 || !customerName}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
