import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminPage2() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Product items", error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/product", {
        name,
        price,
      });
      setProducts([...products, response.data]);
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product item", error);
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
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/adminPage1">User List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Orders List</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Home">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content with Gradient Background */}
      <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #6A82FB, #FC5C7D)', minHeight: "100vh" }}>
        <div className="container p-4 bg-white shadow rounded">
          <h2 className="text-center text-primary mb-4">Products List</h2>

          {/* Add Product Form */}
          <form onSubmit={addProduct} className="mb-4 p-3 bg-light rounded shadow-sm">
            <div className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-warning w-100">Add Product</button>
              </div>
            </div>
          </form>

          {/* Products Table */}
          {loading ? (
            <div className="text-center py-4">
              <span className="spinner-border text-primary"></span> Loading...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="align-middle">
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>Rs {product.price}/-</td>
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
