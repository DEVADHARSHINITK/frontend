import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardService from "./service/DashboardService";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const[orderCount,setOrderCount]=useState(0);
  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const userResponse = await DashboardService.getUserCount();  // Call to get user count
      const productResponse = await DashboardService.getProductCount();
      const orderResponse = await DashboardService.getOrderCount();  // Call to get product count
      setUserCount(userResponse.count);  // Update user count
      setProductCount(productResponse.count);  // Update product count
      setOrderCount(orderResponse.count);
    } catch (error) {
      console.error("Error fetching counts: ", error);
    }
  };
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/dashboard">
            E-Commerce Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/adminPage1">
                  Users List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminPage2">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <h2 className="mb-4 text-center fw-bold">Dashboard Overview</h2>

        {/* Dashboard Boxes (2 per Row) */}
        <div className="row g-4">
          {/* Row 1 */}
          <div className="col-md-6">
            <div className="dashboard-box bg-primary text-white p-4 shadow-lg rounded">
              <h4>Total Users 👥</h4>
              <h2>{userCount}</h2> {/* Dynamically render users count */}
            </div>
          </div>

          <div className="col-md-6">
            <div className="dashboard-box bg-success text-white p-4 shadow-lg rounded">
              <h4>Total Products 🛒</h4>
              <h2>{productCount}</h2> {/* Dynamically render products count */}
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-md-6">
            <div className="dashboard-box bg-warning text-dark p-4 shadow-lg rounded">
              <h4>Categories 📂</h4>
              <h2>6</h2>
            </div>
          </div>
   
          <div className="col-md-6">
            <div className="dashboard-box bg-danger text-dark p-4 shadow-lg rounded">
              <h4>Orders Count </h4>
              <h2>{orderCount}</h2>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; 2025 E-Commerce Dashboard. All Rights Reserved.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .dashboard-box {
          min-height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .dashboard-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }

        .container {
          max-width: 1100px;
        }
      `}</style>
    </div>
  );
}
