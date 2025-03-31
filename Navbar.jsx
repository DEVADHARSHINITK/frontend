import { Link } from "react-router-dom";

export default function Navbar() {
    return (
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
                            <Link className="nav-link text-white d-flex align-items-center" to="/login">
                                👤 Login
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
    );
}
