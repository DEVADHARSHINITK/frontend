import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container text-light">
          <h1 className="display-3 fw-bold mb-3 text-dark">Your Shopping, Simplified</h1>
          <p className="lead mb-4 text-dark">Browse high-quality products and get them delivered with ease. Shop now and experience convenience.</p>
          <Link to="/login" className="btn btn-primary btn-lg">Start Shopping</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container text-center my-5">
        <h2 className="mb-5 text-dark">Why Shop With Us?</h2>
        <div className="row g-5">
          {[ 
            { title: "🌿 Eco-Friendly", desc: "We promote sustainable shopping choices." },
            { title: "📦 Fast Delivery", desc: "Quick, safe, and reliable delivery every time." },
            { title: "🔐 Secure Payment", desc: "Your transactions are encrypted and safe with us." }
          ].map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="card shadow-sm p-4 h-100 rounded-3">
                <h3 className="text-dark">{feature.title}</h3>
                <p className="text-dark">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container text-center my-5">
        <h2 className="mb-5 text-dark">Explore Our Categories</h2>
        <div className="row g-4">
          {["Veggies", "Fruits", "Electronics", "Groceries", "Clothing", "Cosmetics"].map((item, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-sm-6">
              <div className={`card shadow-lg p-5 rounded-3 d-flex align-items-center justify-content-center category-card category-${item.toLowerCase()}`}>
                <h4 className="text-dark">{item}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section text-center py-3 mt-5">
        <p className="mb-0 text-dark">&copy; 2025 E-Commerce App. All Rights Reserved.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .hero-section {
          background: linear-gradient(90deg, #FEE140, #FA709A, #00DBDE, #00A5C4); /* Gradient like RegistrationPage */
          padding: 5rem 0;
        }

        .footer-section {
          background-color: #d0e8ff; /* Light blue, similar to the registration page footer */
        }

        .btn-primary {
          background-color: #007bff; /* Primary blue similar to RegistrationPage */
          border-color: #007bff;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }

        .card {
          background-color: rgba(255, 255, 255, 0.9);
          color: black;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .category-card {
          background-color: #F5F5F5;
          color: #333;
          border-radius: 12px;
          transition: all 0.3s ease;
          padding: 40px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .category-card:hover {
          background-color: #D1E8E2;
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        }

        .category-veggies {
          background-color: #D4EDDA; /* Light Green for Veggies */
        }

        .category-fruits {
          background-color: #FFE6E6; /* Light Pink for Fruits */
        }

        .category-electronics {
          background-color: #D1E8E2; /* Light Blue for Electronics */
        }

        .category-groceries {
          background-color: #FFF3CD; /* Light Yellow for Groceries */
        }

        .category-clothing {
          background-color: #E0F7FA; /* Light Cyan for Clothing */
        }

        .category-cosmetics {
          background-color: #F3E5F5; /* Light Purple for Cosmetics */
        }

        .container {
          max-width: 1200px;
        }
      `}</style>
    </div>
  );
}
